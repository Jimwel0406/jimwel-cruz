import { useEffect, useRef } from "react";

type Layer = {
  seed: number;
  scale: number;
  speed: number;
  bob: number;
  alpha: number;
  tint: [number, number, number];
  noiseY: number;
  warp: number;
  threshold: [number, number];
  mask: [number, number, number, number];
};

type Wash = {
  x: number;
  y: number;
  radius: number;
  color: string;
};

const TEXTURE_WIDTH = 512;
const TEXTURE_HEIGHT = 384;
const LATTICE = 6;
const WARP_PERIOD = 4;
const OCTAVES = 4;

const LAYERS: Layer[] = [
  {
    seed: 1013,
    scale: 2,
    speed: 3.2,
    bob: 0.09,
    alpha: 0.075,
    tint: [100, 108, 156],
    noiseY: 1.45,
    warp: 2.6,
    threshold: [0.48, 0.74],
    mask: [0.02, 0.4, 0.55, 0.98],
  },
  {
    seed: 2029,
    scale: 1.35,
    speed: 7.5,
    bob: 0.15,
    alpha: 0.085,
    tint: [132, 142, 186],
    noiseY: 1.7,
    warp: 1.6,
    threshold: [0.46, 0.72],
    mask: [0.3, 0.8, 0.94, 1],
  },
];

const WASHES: Wash[] = [
  { x: 0.2, y: 0.3, radius: 0.55, color: "rgba(80,40,120,0.12)" },
  { x: 0.75, y: 0.2, radius: 0.5, color: "rgba(30,60,120,0.1)" },
  { x: 0.5, y: 0.6, radius: 0.45, color: "rgba(20,80,60,0.06)" },
];

const HAZE_STOPS: [number, string][] = [
  [0, "rgba(15,15,30,0)"],
  [0.58, "rgba(15,15,30,0.42)"],
  [1, "rgba(10,10,20,0.78)"],
];

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const hash = (x: number, y: number, seed: number) => {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

const valueNoise = (x: number, y: number, period: number, seed: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const x0 = ((xi % period) + period) % period;
  const y0 = ((yi % period) + period) % period;
  const x1 = (x0 + 1) % period;
  const y1 = (y0 + 1) % period;
  const n00 = hash(x0, y0, seed);
  const n10 = hash(x1, y0, seed);
  const n01 = hash(x0, y1, seed);
  const n11 = hash(x1, y1, seed);
  return (n00 * (1 - u) + n10 * u) * (1 - v) + (n01 * (1 - u) + n11 * u) * v;
};

const fbm = (x: number, y: number, period: number, seed: number) => {
  let sum = 0;
  let norm = 0;
  let amp = 1;
  let freq = 1;
  for (let octave = 0; octave < OCTAVES; octave++) {
    sum += amp * valueNoise(x * freq, y * freq, period * freq, seed + octave * 131);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
};

const makeCloudTexture = (layer: Layer) => {
  const texture = document.createElement("canvas");
  texture.width = TEXTURE_WIDTH;
  texture.height = TEXTURE_HEIGHT;
  const ctx = texture.getContext("2d");
  if (!ctx) return texture;

  const image = ctx.createImageData(TEXTURE_WIDTH, TEXTURE_HEIGHT);
  const { data } = image;
  const [r, g, b] = layer.tint;
  const [fadeTop0, fadeTop1, fadeBottom0, fadeBottom1] = layer.mask;
  const [threshold0, threshold1] = layer.threshold;

    for (let x = 0; x < TEXTURE_WIDTH; x++) {
      const u = x / TEXTURE_WIDTH;
      const warp = (valueNoise(u * WARP_PERIOD, 0.5, WARP_PERIOD, layer.seed + 977) - 0.5) * layer.warp;
      const ny = u * LATTICE;
      for (let y = 0; y < TEXTURE_HEIGHT; y++) {
        const ty = y / TEXTURE_HEIGHT;
        const vertical = smoothstep(fadeTop0, fadeTop1, ty) * (1 - smoothstep(fadeBottom0, fadeBottom1, ty));
        const index = (y * TEXTURE_WIDTH + x) * 4;
        if (vertical > 0) {
          const n = fbm(ny, ty * LATTICE * layer.noiseY + warp, LATTICE, layer.seed);
          const coverage = smoothstep(threshold0, threshold1, n);
          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = Math.round(255 * coverage * vertical);
        }
      }
    }

  ctx.putImageData(image, 0, 0);
  return texture;
};

export default function CloudLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layers = LAYERS.map((layer, index) => ({
      layer,
      texture: makeCloudTexture(layer),
      phase: index * 0.37,
    }));

    let width = 0;
    let height = 0;
    const washes: CanvasGradient[] = [];
    let haze: CanvasGradient | null = null;

    const buildGradients = () => {
      washes.length = 0;
      for (const wash of WASHES) {
        const gradient = ctx.createRadialGradient(
          wash.x * width,
          wash.y * height,
          0,
          wash.x * width,
          wash.y * height,
          wash.radius * Math.max(width, height),
        );
        gradient.addColorStop(0, wash.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        washes.push(gradient);
      }

      haze = ctx.createLinearGradient(0, height * 0.6, 0, height);
      for (const [stop, color] of HAZE_STOPS) haze.addColorStop(stop, color);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGradients();
    };

    const render = (time: number) => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < washes.length; i++) {
        const gradient = washes[i];
        if (!gradient) continue;
        ctx.save();
        ctx.translate(Math.sin(time * 0.012 + i) * width * 0.02, Math.cos(time * 0.009 + i) * height * 0.02);
        ctx.fillStyle = gradient;
        ctx.fillRect(-width * 0.2, -height * 0.2, width * 1.4, height * 1.4);
        ctx.restore();
      }

      ctx.globalCompositeOperation = "lighter";
      for (const { layer, texture, phase } of layers) {
        const tileWidth = texture.width * (height / texture.height) * layer.scale;
        const offsetY = Math.sin(time * layer.bob + phase * 8) * height * 0.012;
        const shift = (time * layer.speed + phase * tileWidth) % tileWidth;
        ctx.globalAlpha = layer.alpha;
        for (let x = -shift; x < width; x += tileWidth - 1) {
          ctx.drawImage(texture, x, offsetY, tileWidth, height);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (haze) {
        ctx.fillStyle = haze;
        ctx.fillRect(0, height * 0.6, width, height * 0.4);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;
    let elapsed = reduced ? 12 : 0;
    let previous = 0;

    const loop = (now: number) => {
      const dt = previous === 0 ? 0 : Math.min(Math.max((now - previous) / 1000, 0), 0.05);
      previous = now;
      elapsed += dt;
      render(elapsed);
      raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      previous = 0;
      raf = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    const onResize = () => {
      resize();
      render(elapsed);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    let intersection: IntersectionObserver | null = null;
    if (!reduced) {
      intersection = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !document.hidden) start();
        else stop();
      });
      intersection.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
    }

    const observer = new ResizeObserver(onResize);
    observer.observe(canvas);
    onResize();
    start();

    return () => {
      stop();
      observer.disconnect();
      intersection?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
