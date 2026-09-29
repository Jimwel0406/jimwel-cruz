import type { Group, ShaderMaterial, Sprite, Vector3, WebGLRenderer } from "three";
import { useEffect, useRef } from "react";

type Meteor = {
  group: Group;
  core: ShaderMaterial;
  halo: ShaderMaterial;
  sprite: Sprite;
  pos: Vector3;
  dir: Vector3;
  speed: number;
  age: number;
  maxAge: number;
  alpha: number;
  length: number;
};

const VERTEX_SHADER = /* glsl */ `
  uniform float uLength;
  uniform float uWidth;
  varying vec2 vAlong;
  void main() {
    vAlong = uv;
    float along = uv.x;
    float taper = mix(0.04, 1.0, pow(along, 1.5));
    vec3 p = position;
    p.x = (along - 0.5) * uLength;
    p.y = (uv.y - 0.5) * uWidth * taper;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vAlong;
  void main() {
    float along = vAlong.x;
    float across = sin(clamp(vAlong.y, 0.0, 1.0) * 3.14159265);
    float core = pow(along, 6.0);
    vec3 col = mix(uColor, vec3(1.0), core);
    float a = pow(along, 2.0) * pow(across, 1.4) * uOpacity;
    gl_FragColor = vec4(col, a);
  }
`;

const FOV = 52;
const MAX_METEORS = 4;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

export default function MeteorLayer() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let teardown: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.pointerEvents = "none";
      host.appendChild(canvas);

      renderer.setClearAlpha(0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 400);
      const tanHalfFov = Math.tan((FOV * Math.PI) / 360);
      const halfHeightAt = (z: number) => tanHalfFov * Math.abs(z);
      const halfWidthAt = (z: number) => halfHeightAt(z) * camera.aspect;

      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = 128;
      glowCanvas.height = 128;
      const glowCtx = glowCanvas.getContext("2d");
      if (glowCtx) {
        const grd = glowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.16, "rgba(255,255,255,0.82)");
        grd.addColorStop(0.4, "rgba(200,255,0,0.32)");
        grd.addColorStop(1, "rgba(200,255,0,0)");
        glowCtx.fillStyle = grd;
        glowCtx.fillRect(0, 0, 128, 128);
      }
      const glowTexture = new THREE.CanvasTexture(glowCanvas);
      glowTexture.colorSpace = THREE.SRGBColorSpace;

      const ribbonPlane = new THREE.PlaneGeometry(1, 1);
      const accent = new THREE.Color(0xc8ff00);
      const makeRibbon = (opacity: number) =>
        new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          uniforms: {
            uLength: { value: 1 },
            uWidth: { value: 1 },
            uOpacity: { value: opacity },
            uColor: { value: accent },
          },
          transparent: true,
          depthWrite: false,
          depthTest: false,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        });

      const meteors: Meteor[] = [];
      let spawnAt = 0.4;
      let elapsed = 0;

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      const spawn = () => {
        const z = -(13 + Math.random() * 47);
        const halfH = halfHeightAt(z);
        const halfW = halfWidthAt(z);
        const dir = new THREE.Vector3(
          0.5 + Math.random() * 0.3,
          -(0.78 + Math.random() * 0.34),
          0.16 + Math.random() * 0.28
        ).normalize();
        const scale = Math.abs(z) / 40;
        const speed = (14 + Math.random() * 9) * scale;
        const length = Math.max(3, speed * 0.5);

        const core = makeRibbon(1);
        const halo = makeRibbon(0.22);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
            opacity: 1,
          })
        );
        sprite.position.set(length / 2, 0, 0);

        const group = new THREE.Group();
        group.add(new THREE.Mesh(ribbonPlane, halo));
        group.add(new THREE.Mesh(ribbonPlane, core));
        group.add(sprite);
        scene.add(group);

        meteors.push({
          group,
          core,
          halo,
          sprite,
          pos: new THREE.Vector3(
            (Math.random() * 2 - 1) * halfW * 0.72,
            halfH * (1.04 + Math.random() * 0.22),
            z
          ),
          dir,
          speed,
          age: 0,
          maxAge: 4.2 + Math.random() * 1.6,
          alpha: 0.85 + Math.random() * 0.15,
          length,
        });

        const roll = Math.random();
        if (roll < 0.2) spawnAt = elapsed + 0.6 + Math.random();
        else if (roll < 0.58) spawnAt = elapsed + 2 + Math.random() * 3;
        else spawnAt = elapsed + 5 + Math.random() * 7;
      };

      const disposeMeteor = (index: number) => {
        const meteor = meteors[index];
        if (!meteor) return;
        scene.remove(meteor.group);
        meteor.core.dispose();
        meteor.halo.dispose();
        meteor.sprite.material.dispose();
        meteors.splice(index, 1);
      };

      const xAxis = new THREE.Vector3();
      const zAxis = new THREE.Vector3();
      const yAxis = new THREE.Vector3();
      const towardCamera = new THREE.Vector3();
      const basis = new THREE.Matrix4();
      const timer = new THREE.Timer();

      const frame = () => {
        timer.update();
        const dt = Math.min(Math.max(timer.getDelta(), 0), 0.05);
        elapsed += dt;

        if (elapsed > spawnAt && meteors.length < MAX_METEORS) spawn();

        for (let i = meteors.length - 1; i >= 0; i--) {
          const meteor = meteors[i];
          if (!meteor) continue;

          meteor.age += dt;
          meteor.pos.addScaledVector(meteor.dir, meteor.speed * dt);

          const depth = Math.abs(meteor.pos.z);
          const fadeIn = Math.min(1, meteor.age / 0.28);
          const fadeOut = 1 - smoothstep(0.62, 1, meteor.age / meteor.maxAge);
          const near = smoothstep(4, 11, depth);
          const opacity = meteor.alpha * fadeIn * fadeOut * near;

          const width = halfHeightAt(depth) * 2 * 0.014;
          const pulse = 1 + Math.sin(meteor.age * 7) * 0.16;

          xAxis.copy(meteor.dir);
          towardCamera.copy(meteor.pos).negate().normalize();
          zAxis.copy(towardCamera).addScaledVector(xAxis, -towardCamera.dot(xAxis)).normalize();
          yAxis.crossVectors(zAxis, xAxis).normalize();
          basis.makeBasis(xAxis, yAxis, zAxis);
          meteor.group.quaternion.setFromRotationMatrix(basis);
          meteor.group.position.copy(meteor.pos).addScaledVector(meteor.dir, -meteor.length / 2);

          meteor.core.uniforms.uLength!.value = meteor.length;
          meteor.core.uniforms.uWidth!.value = width;
          meteor.core.uniforms.uOpacity!.value = opacity;
          meteor.halo.uniforms.uLength!.value = meteor.length;
          meteor.halo.uniforms.uWidth!.value = width * 3.4;
          meteor.halo.uniforms.uOpacity!.value = opacity * 0.22;

          const headSize = halfHeightAt(depth) * 2 * 0.05 * pulse;
          meteor.sprite.scale.set(headSize, headSize, 1);
          meteor.sprite.material.opacity = Math.min(1, opacity * 1.25);

          const below = meteor.pos.y < -halfHeightAt(depth) * 1.3;
          const passed = meteor.pos.z > -3.5;
          if (meteor.age > meteor.maxAge || below || passed) disposeMeteor(i);
        }

        camera.rotation.y = Math.sin(elapsed * 0.06) * 0.022;
        camera.rotation.x = Math.cos(elapsed * 0.05) * 0.016;

        renderer.render(scene, camera);
      };

      resize();

      let raf = 0;
      let running = false;

      const loop = () => {
        frame();
        raf = window.requestAnimationFrame(loop);
      };

      const start = () => {
        if (running || disposed) return;
        running = true;
        timer.reset();
        raf = window.requestAnimationFrame(loop);
      };

      const stop = () => {
        running = false;
        window.cancelAnimationFrame(raf);
      };

      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };

      let inView = true;
      const intersection = new IntersectionObserver(
        (entries) => {
          inView = entries.some((entry) => entry.isIntersecting);
          if (inView && !document.hidden) start();
          else stop();
        },
        { threshold: 0 }
      );
      intersection.observe(host);

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      document.addEventListener("visibilitychange", onVisibility);

      if (!document.hidden) start();

      teardown = () => {
        stop();
        intersection.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        while (meteors.length) disposeMeteor(0);
        ribbonPlane.dispose();
        glowTexture.dispose();
        renderer.dispose();
        canvas.remove();
      };
    };

    void boot();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
