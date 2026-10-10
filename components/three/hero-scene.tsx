"use client";

/**
 * HeroScene — The Pillars, interactive.
 *
 * A wireframe tetrahedron with four vertex nodes — one per pillar
 * (Engineer · Builder · Thinker · Founder). Each vertex is hover-aware and
 * click-aware: hover surfaces the pillar label as an HTML billboard, click
 * fires `onVertexClick(pillar)` which the hero section uses to open the
 * Pillar overlay.
 *
 * When a pillar is focused, mouse parallax pauses, auto-rotation pauses,
 * the group quat-lerps so the focused vertex faces the camera, and the
 * camera dollies in for a closer pose.
 *
 * Bloom is dialled tight (vertex cores only) so the form stays
 * architectural rather than luminous.
 */

import {
  useRef,
  useMemo,
  useEffect,
  useState,
  Suspense,
  useCallback,
} from "react";
import type { ReactNode, RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { PILLARS, pillarUppercase, type Pillar } from "@/lib/brand";
import { PillarDiagram } from "@/components/three/pillar-diagram";

const ACCENT = "#C7F65E";
const INK = "#F5F1E6";

const PARTICLE_COUNT = 90;
const PARTICLE_INNER_RADIUS = 2.6;
const PARTICLE_OUTER_RADIUS = 4.4;
const CONNECTION_THRESHOLD = 1.05;
const MAX_CONNECTIONS = 400;

const CAMERA_REST_Z = 8.5;
const CAMERA_FOCUS_Z = 6;

type SceneProps = {
  onVertexClick?: (pillar: Pillar) => void;
  focusedPillar?: Pillar | null;
};

// ─── Pillar tetrahedron ──────────────────────────────────────────────────────
function PillarTetrahedron({ onVertexClick, focusedPillar }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const vertexRefs = useRef<(THREE.Mesh | null)[]>([]);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Regular tetrahedron — four vertices on a unit cube's alternating corners.
  // Index → pillar mapping is fixed: PILLARS[i] is the pillar at vertex i.
  const SIZE = 1.15;
  const vertices = useMemo(
    () => [
      new THREE.Vector3(SIZE, SIZE, SIZE),
      new THREE.Vector3(-SIZE, -SIZE, SIZE),
      new THREE.Vector3(-SIZE, SIZE, -SIZE),
      new THREE.Vector3(SIZE, -SIZE, -SIZE),
    ],
    [],
  );

  const edgesPositions = useMemo(() => {
    const pairs: Array<[number, number]> = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ];
    const arr: number[] = [];
    pairs.forEach(([a, b]) => {
      arr.push(...vertices[a].toArray(), ...vertices[b].toArray());
    });
    return new Float32Array(arr);
  }, [vertices]);

  // Reusable temp objects so we don't allocate per-frame.
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);
  const focusedAxis = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    if (focusedPillar) {
      // Quaternion lerp so the focused vertex's local direction lands at +Z
      const idx = PILLARS.indexOf(focusedPillar);
      const v = vertices[idx];
      targetQuat.setFromUnitVectors(
        v.clone().normalize(),
        focusedAxis,
      );
      const k = 1 - Math.exp(-delta * 5);
      groupRef.current.quaternion.slerp(targetQuat, k);
    } else {
      // Resume the time-driven editorial rotation
      groupRef.current.rotation.y = t * 0.07;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.18;
    }

    // Vertex pulses — always alive, even when focused
    vertexRefs.current.forEach((m, i) => {
      if (!m) return;
      const baseScale = hoveredIdx === i || PILLARS.indexOf(focusedPillar ?? ('' as Pillar)) === i
        ? 1.6
        : 1;
      const pulse = baseScale * (1 + Math.sin(t * 1.3 + i * (Math.PI / 2)) * 0.18);
      m.scale.setScalar(pulse);
    });
    ringRefs.current.forEach((m, i) => {
      if (!m) return;
      const isActive =
        hoveredIdx === i ||
        PILLARS.indexOf(focusedPillar ?? ('' as Pillar)) === i;
      const baseScale = isActive ? 1.6 : 1;
      const pulse = baseScale * (1 + Math.sin(t * 1.3 + i * (Math.PI / 2) + 0.6) * 0.4);
      m.scale.setScalar(pulse);
      const mat = m.material as THREE.MeshBasicMaterial;
      const baseOpacity = isActive ? 0.45 : 0.25;
      mat.opacity = baseOpacity - Math.sin(t * 1.3 + i * (Math.PI / 2)) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgesPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.42} />
      </lineSegments>

      {vertices.map((v, i) => {
        const pillar = PILLARS[i];
        const hovered = hoveredIdx === i;
        return (
          <group
            key={i}
            position={v.toArray()}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIdx(i);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredIdx(null);
              document.body.style.cursor = "";
            }}
            onClick={(e) => {
              e.stopPropagation();
              onVertexClick?.(pillar);
            }}
          >
            {/* Invisible larger sphere — fattens the pickable area so
                vertices are easy to click without bloating their visual size */}
            <mesh visible={false}>
              <sphereGeometry args={[0.34, 12, 12]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <mesh ref={(el) => void (ringRefs.current[i] = el)}>
              <sphereGeometry args={[0.14, 24, 24]} />
              <meshBasicMaterial
                color={ACCENT}
                transparent
                opacity={0.12}
                depthWrite={false}
              />
            </mesh>

            <mesh ref={(el) => void (vertexRefs.current[i] = el)}>
              <sphereGeometry args={[0.07, 24, 24]} />
              <meshBasicMaterial color={ACCENT} toneMapped={false} />
            </mesh>

            {hovered && (
              <Html
                center
                position={[0, 0.32, 0]}
                zIndexRange={[100, 0]}
                style={{ pointerEvents: "none" }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: ACCENT,
                    background: "rgba(10, 11, 10, 0.78)",
                    border: `1px solid ${ACCENT}33`,
                    padding: "0.35rem 0.6rem",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {pillarUppercase(pillar)}
                </span>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

// ─── Camera rig — dollies in on focus ────────────────────────────────────────
function CameraRig({ focused }: { focused: boolean }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const targetZ = focused ? CAMERA_FOCUS_Z : CAMERA_REST_Z;
    const k = 1 - Math.exp(-delta * 4);
    camera.position.z += (targetZ - camera.position.z) * k;
  });
  return null;
}

// ─── Particle network ────────────────────────────────────────────────────────
function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const particles = useMemo(() => {
    const data: {
      bx: number;
      by: number;
      bz: number;
      phase: number;
      speed: number;
      amp: number;
    }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r =
        PARTICLE_INNER_RADIUS +
        Math.random() * (PARTICLE_OUTER_RADIUS - PARTICLE_INNER_RADIUS);
      const sq = Math.sqrt(1 - u * u);
      data.push({
        bx: r * sq * Math.cos(theta),
        by: r * u,
        bz: r * sq * Math.sin(theta),
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        amp: 0.06 + Math.random() * 0.1,
      });
    }
    return data;
  }, []);

  const pointsPositions = useMemo(
    () => new Float32Array(PARTICLE_COUNT * 3),
    [],
  );
  const linePositions = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 2 * 3),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      const dx = Math.sin(t * p.speed + p.phase) * p.amp;
      const dy = Math.cos(t * p.speed * 0.7 + p.phase) * p.amp;
      const dz = Math.sin(t * p.speed * 1.1 + p.phase * 1.3) * p.amp;
      pointsPositions[i * 3] = p.bx + dx;
      pointsPositions[i * 3 + 1] = p.by + dy;
      pointsPositions[i * 3 + 2] = p.bz + dz;
    }

    const thrSq = CONNECTION_THRESHOLD * CONNECTION_THRESHOLD;
    let conn = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (conn >= MAX_CONNECTIONS) break;
      const ix = pointsPositions[i * 3];
      const iy = pointsPositions[i * 3 + 1];
      const iz = pointsPositions[i * 3 + 2];
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        if (conn >= MAX_CONNECTIONS) break;
        const jx = pointsPositions[j * 3];
        const jy = pointsPositions[j * 3 + 1];
        const jz = pointsPositions[j * 3 + 2];
        const dx = ix - jx,
          dy = iy - jy,
          dz = iz - jz;
        if (dx * dx + dy * dy + dz * dz < thrSq) {
          const idx = conn * 6;
          linePositions[idx] = ix;
          linePositions[idx + 1] = iy;
          linePositions[idx + 2] = iz;
          linePositions[idx + 3] = jx;
          linePositions[idx + 4] = jy;
          linePositions[idx + 5] = jz;
          conn++;
        }
      }
    }

    if (pointsRef.current) {
      (
        pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
      ).needsUpdate = true;
    }
    if (linesRef.current) {
      (
        linesRef.current.geometry.attributes.position as THREE.BufferAttribute
      ).needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, conn * 2);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={ACCENT}
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ─── Mouse parallax — pauses when a pillar is focused ────────────────────────
function MouseParallax({
  paused,
  children,
}: {
  paused: boolean;
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const tx = paused ? 0 : target.current.x;
    const ty = paused ? 0 : target.current.y;
    groupRef.current.rotation.y +=
      (tx * 0.18 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x +=
      (ty * 0.12 - groupRef.current.rotation.x) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Scene root ──────────────────────────────────────────────────────────────
function Scene({ onVertexClick, focusedPillar }: SceneProps) {
  const focused = !!focusedPillar;
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={0.4} color={INK} />
      <directionalLight position={[-3, -2, -2]} intensity={0.2} color={ACCENT} />

      <CameraRig focused={focused} />

      <MouseParallax paused={focused}>
        <Float speed={0.9} rotationIntensity={focused ? 0.02 : 0.08} floatIntensity={0.15}>
          <PillarTetrahedron
            onVertexClick={onVertexClick}
            focusedPillar={focusedPillar}
          />
        </Float>
        <ParticleNetwork />
      </MouseParallax>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.22}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.4} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** True while any part of the element is on screen. */
function useInView(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function HeroScene({ onVertexClick, focusedPillar }: SceneProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // The particle network recomputes ~4k distance checks a frame; there is no
  // reason to pay for that while the hero is scrolled out of view.
  const inView = useInView(wrapperRef);

  useEffect(() => setMounted(true), []);

  // Stable handler so child components don't re-mount when parent rerenders.
  const handleClick = useCallback(
    (p: Pillar) => onVertexClick?.(p),
    [onVertexClick],
  );

  // The hero only mounts this scene from the md breakpoint up; small screens
  // get the in-flow PillarDiagram instead. The wrapper is shared by both
  // branches so the visibility observer is attached from the first render.
  return (
    <div ref={wrapperRef} className="relative h-full w-full min-h-[400px] md:min-h-[500px]">
      {!mounted || reduced ? (
        <div className="absolute inset-0 flex items-center justify-center text-[var(--foreground)]">
          <PillarDiagram
            onVertexClick={handleClick}
            className="w-[80%] h-[80%] max-w-[520px]"
          />
        </div>
      ) : (
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          frameloop={inView ? "always" : "never"}
          camera={{ position: [0, 0, CAMERA_REST_Z], fov: 32 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene onVertexClick={handleClick} focusedPillar={focusedPillar} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
