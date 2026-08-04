import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

interface GoldenCard3DProps {
  color?: string;
  accent?: string;
}

function shade(hex: string, factor: number): string {
  const c = new THREE.Color(hex);
  c.multiplyScalar(factor);
  return "#" + c.getHexString();
}

function tint(hex: string, factor: number): string {
  const c = new THREE.Color(hex);
  c.lerp(new THREE.Color(0xffffff), factor);
  return "#" + c.getHexString();
}

export default function GoldenCard3D({
  color = "#d4af37",
  accent = "#ffffff",
}: GoldenCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.1, 3.6);
    camera.lookAt(0, 0, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xfff3e0, 2.6);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 1.4);
    rim.position.set(-3, 1, -4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const dark = shade(color, 0.55);
    const light = tint(color, 0.35);

    const bodyGeo = new RoundedBoxGeometry(0.86, 1.34, 0.11, 3, 0.09);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.95,
      roughness: 0.28,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    const emblemGeo = new RoundedBoxGeometry(0.3, 0.3, 0.012, 3, 0.05);
    const emblemMat = new THREE.MeshPhysicalMaterial({
      color: dark,
      metalness: 0.9,
      roughness: 0.35,
    });
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.position.set(0, 0.34, 0.062);
    group.add(emblem);

    const markGeo = new RoundedBoxGeometry(0.12, 0.12, 0.016, 3, 0.02);
    const markMat = new THREE.MeshPhysicalMaterial({
      color: accent,
      metalness: 0.7,
      roughness: 0.3,
    });
    const mark = new THREE.Mesh(markGeo, markMat);
    mark.position.set(0, 0.34, 0.075);
    group.add(mark);

    const lineGeo = new THREE.BoxGeometry(0.46, 0.05, 0.012);
    const lineMat = new THREE.MeshPhysicalMaterial({
      color: light,
      metalness: 0.85,
      roughness: 0.35,
    });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.set(0, -0.26, 0.062);
    group.add(line);

    const frameGeo = new RoundedBoxGeometry(0.8, 1.28, 0.12, 3, 0.07);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: tint(color, 0.55),
      metalness: 1,
      roughness: 0.16,
      transparent: true,
      opacity: 0.28,
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    group.add(frame);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.5) * 0.22 + t * 0.1;
      group.rotation.x = Math.sin(t * 0.4) * 0.06;
      group.position.y = Math.sin(t * 0.8) * 0.07;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      pmrem.dispose();
      envTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      [bodyGeo, emblemGeo, markGeo, lineGeo, frameGeo].forEach((g) =>
        g.dispose(),
      );
      [bodyMat, emblemMat, markMat, lineMat, frameMat].forEach((m) =>
        m.dispose(),
      );
    };
  }, [color, accent]);

  return <div ref={containerRef} className="h-full w-full" />;
}
