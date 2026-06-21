'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Environment,
  Points,
  PointMaterial,
} from '@react-three/drei'
import * as THREE from 'three'

function DistortedCore() {
  const ref = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.x = t * 0.12
      ref.current.rotation.y = t * 0.16
    }
    if (inner.current) {
      inner.current.rotation.x = -t * 0.2
      inner.current.rotation.y = -t * 0.1
    }
  })

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
        <Icosahedron ref={ref} args={[1.55, 6]}>
          <MeshDistortMaterial
            color="#1fb6d4"
            emissive="#0a4a59"
            emissiveIntensity={0.28}
            roughness={0.15}
            metalness={0.9}
            distort={0.38}
            speed={1.6}
          />
        </Icosahedron>
        <Icosahedron ref={inner} args={[1.95, 1]}>
          <meshBasicMaterial color="#3fd0ec" wireframe transparent opacity={0.1} />
        </Icosahedron>
      </Float>
    </group>
  )
}

function StarField() {
  const positions = useMemo(() => {
    const count = 900
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#7fe3f5"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  )
}

function PointerLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = state.pointer.x * 4
      ref.current.position.y = state.pointer.y * 4
    }
  })
  return <pointLight ref={ref} intensity={40} color="#f2a154" distance={12} />
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} color="#bff3ff" />
        <PointerLight />
        <DistortedCore />
        <StarField />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
