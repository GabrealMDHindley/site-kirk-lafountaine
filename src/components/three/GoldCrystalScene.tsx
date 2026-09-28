"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Safe to read matchMedia synchronously here: this module is only ever loaded
// client-side via next/dynamic({ ssr: false }) in HeroScene, so it never runs
// during server rendering.
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function Crystal({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!reduced) {
      group.current.rotation.y += delta * 0.18;
    }
    const targetX = reduced ? 0 : pointer.current.y * 0.15;
    const targetZ = reduced ? 0 : pointer.current.x * 0.15;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.03;
  });

  const scale = Math.min(viewport.width / 6, 1.4);

  return (
    <group ref={group} scale={scale}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#c9a24b"
          metalness={1}
          roughness={0.22}
          reflectivity={1}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          emissive="#4a3212"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh scale={0.62} rotation={[0.6, 0.4, 0.2]}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#e8c97a"
          metalness={1}
          roughness={0.1}
          emissive="#8a6a2c"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Deterministic pseudo-random in [0, 1) — keeps ember placement stable across
// re-renders without calling an impure Math.random() during render.
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Embers({ count = 120 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seededRandom(i * 3.1) - 0.5) * 12;
      arr[i * 3 + 1] = (seededRandom(i * 7.7 + 1) - 0.5) * 8;
      arr[i * 3 + 2] = (seededRandom(i * 5.3 + 2) - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#e8c97a"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function GoldCrystalScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      dpr={reduced ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} color="#5a4a2f" />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#f3d98a" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#1e6fa8" />
      <Crystal reduced={reduced} />
      {!reduced && <Embers />}
    </Canvas>
  );
}
