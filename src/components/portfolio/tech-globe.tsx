'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { techLogos } from '@/lib/data'

function spherePoints(n: number, r = 2.4) {
  const pts: { x: number; y: number; z: number }[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push({ x: Math.cos(theta) * radius * r, y: y * r, z: Math.sin(theta) * radius * r })
  }
  return pts
}

function SpinningCloud() {
  const group = useRef<THREE.Group>(null)
  const points = useMemo(() => spherePoints(techLogos.length), [])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.18
    }
  })

  return (
    <group ref={group}>
      {/* glow core */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#1fb6d4" transparent opacity={0.06} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.4, 24, 24]} />
        <meshBasicMaterial color="#1fb6d4" wireframe transparent opacity={0.07} />
      </mesh>
      {points.map((p, i) => {
        const logo = techLogos[i]
        return (
          <group key={logo.name} position={[p.x, p.y, p.z]}>
            <Html
              center
              transform
              sprite
              distanceFactor={6}
              style={{
                pointerEvents: 'auto',
              }}
            >
              <a
                href="#skills"
                title={logo.name}
                className="globe-chip"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src={logo.src || '/placeholder.svg'}
                  alt={logo.name}
                  width={28}
                  height={28}
                  loading="lazy"
                />
                <span>{logo.name}</span>
              </a>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

export function TechGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.8_0.14_205/0.18),transparent_65%)] blur-2xl" />
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <SpinningCloud />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          rotateSpeed={0.6}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
        drag to spin
      </p>
    </div>
  )
}