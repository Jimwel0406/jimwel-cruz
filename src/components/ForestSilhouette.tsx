import { useEffect, useRef } from "react";

type Row = {
  spacing: number;
  minHeight: number;
  maxHeight: number;
  color: string;
  firRatio: number;
  seed: number;
};

const ROWS: Row[] = [
  { spacing: 34, minHeight: 0.3, maxHeight: 0.46, color: "#10162a", firRatio: 0.8, seed: 1019 },
  { spacing: 54, minHeight: 0.42, maxHeight: 0.64, color: "#0a0d1c", firRatio: 0.86, seed: 2027 },
  { spacing: 82, minHeight: 0.58, maxHeight: 0.86, color: "#04050c", firRatio: 0.72, seed: 3041 },
];

const BAND_HEIGHT = "clamp(150px, 22vh, 210px)";

const makeRandom = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const drawFir = (
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  height: number,
  halfWidth: number,
  tiers: number,
  color: string,
  rnd: () => number,
) => {
  const trunkHeight = height * (0.09 + rnd() * 0.05);
  const trunkHalf = Math.max(1, halfWidth * 0.11);
  const canopyTop = groundY - height;
  const canopyHeight = height - trunkHeight;
  ctx.fillStyle = color;
  ctx.fillRect(x - trunkHalf, groundY - trunkHeight, trunkHalf * 2, trunkHeight + 0.5);

  const lean = (rnd() - 0.5) * 0.16;
  for (let i = 0; i < tiers; i++) {
    const apexY = canopyTop + canopyHeight * (i / tiers) * 0.9;
    const baseY = canopyTop + canopyHeight * ((i + 1) / tiers);
    const width = halfWidth * (0.16 + 0.84 * ((i + 1) / tiers));
    ctx.beginPath();
    ctx.moveTo(x, apexY);
    ctx.lineTo(x - width * (1 - lean), baseY);
    ctx.lineTo(x + width * (1 + lean), baseY);
    ctx.closePath();
    ctx.fill();
  }
};

const drawBroadleaf = (
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  height: number,
  halfWidth: number,
  color: string,
  rnd: () => number,
) => {
  const trunkHeight = height * (0.3 + rnd() * 0.14);
  const trunkHalf = Math.max(1, halfWidth * 0.09);
  ctx.fillStyle = color;
  ctx.fillRect(x - trunkHalf, groundY - trunkHeight, trunkHalf * 2, trunkHeight + 0.5);

  const crownY = groundY - trunkHeight - height * 0.24;
  const lobes = 4 + Math.floor(rnd() * 3);
  for (let i = 0; i < lobes; i++) {
    const angle = (i / lobes) * Math.PI * 2 + rnd();
    ctx.beginPath();
    ctx.arc(
      x + Math.cos(angle) * halfWidth * 0.4,
      crownY + Math.sin(angle) * halfWidth * 0.3,
      halfWidth * (0.54 + rnd() * 0.26),
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
};

export default function ForestSilhouette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (const row of ROWS) {
        const rnd = makeRandom(row.seed);
        let x = -row.spacing * 0.5;
        while (x < width + row.spacing) {
          const treeHeight = height * (row.minHeight + rnd() * (row.maxHeight - row.minHeight));
          if (rnd() < row.firRatio) {
            drawFir(
              ctx,
              x,
              height,
              treeHeight,
              treeHeight * (0.19 + rnd() * 0.09),
              4 + Math.floor(rnd() * 4),
              row.color,
              rnd,
            );
          } else {
            drawBroadleaf(
              ctx,
              x,
              height,
              treeHeight,
              treeHeight * (0.26 + rnd() * 0.1),
              row.color,
              rnd,
            );
          }
          x += row.spacing * (0.62 + rnd() * 0.7);
        }
      }
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="forest-silhouette absolute bottom-0 left-0 right-0 z-[2]" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full" style={{ height: BAND_HEIGHT }} />
    </div>
  );
}
