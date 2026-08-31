'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface InteractiveRobotProps {
  mouseX: number
  mouseY: number
  isMoving: boolean
}

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor
}

export function InteractiveRobot({ mouseX, mouseY, isMoving }: InteractiveRobotProps) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const bodyRef = useRef<THREE.Group>(null)

  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  const darkMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0f',
    metalness: 0.85,
    roughness: 0.25,
  }), [])

  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6d8dff',
    metalness: 0.6,
    roughness: 0.3,
    emissive: '#6d8dff',
    emissiveIntensity: 0.4,
  }), [])

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6d8dff',
    metalness: 0.3,
    roughness: 0.5,
    emissive: '#6d8dff',
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.6,
  }), [])

  const visorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a2e',
    metalness: 0.9,
    roughness: 0.1,
    emissive: '#6d8dff',
    emissiveIntensity: 0.15,
  }), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    targetRotation.current.x = mouseY * 0.15
    targetRotation.current.y = mouseX * 0.35

    currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.04)
    currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.04)

    if (headRef.current) {
      headRef.current.rotation.x = currentRotation.current.x
      headRef.current.rotation.y = currentRotation.current.y
    }

    if (bodyRef.current) {
      bodyRef.current.rotation.y = currentRotation.current.y * 0.15
      bodyRef.current.rotation.x = currentRotation.current.x * 0.05
    }

    if (groupRef.current) {
      const breathScale = 1 + Math.sin(t * 1.2) * 0.008
      groupRef.current.scale.y = breathScale
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.04
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeX = mouseX * 0.03
      const eyeY = mouseY * 0.02
      leftEyeRef.current.position.x = -0.18 + eyeX
      leftEyeRef.current.position.y = 0.12 + eyeY
      rightEyeRef.current.position.x = 0.18 + eyeX
      rightEyeRef.current.position.y = 0.12 + eyeY

      const blinkCycle = Math.sin(t * 3) > 0.97 ? 0.1 : 1
      leftEyeRef.current.scale.y = blinkCycle
      rightEyeRef.current.scale.y = blinkCycle
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Torso */}
      <group ref={bodyRef}>
        <mesh position={[0, 0, 0]} material={darkMaterial}>
          <capsuleGeometry args={[0.35, 0.6, 16, 32]} />
        </mesh>

        {/* Chest plate */}
        <mesh position={[0, 0.05, 0.2]} material={darkMaterial}>
          <boxGeometry args={[0.5, 0.55, 0.12]} />
        </mesh>

        {/* Chest accent line */}
        <mesh position={[0, 0.15, 0.27]} material={accentMaterial}>
          <boxGeometry args={[0.35, 0.025, 0.02]} />
        </mesh>

        {/* Chest core glow */}
        <mesh position={[0, -0.05, 0.27]} material={glowMaterial}>
          <circleGeometry args={[0.06, 32]} />
        </mesh>

        {/* Shoulders */}
        <mesh position={[-0.45, 0.25, 0]} material={darkMaterial}>
          <sphereGeometry args={[0.14, 24, 24]} />
        </mesh>
        <mesh position={[0.45, 0.25, 0]} material={darkMaterial}>
          <sphereGeometry args={[0.14, 24, 24]} />
        </mesh>

        {/* Shoulder accents */}
        <mesh position={[-0.45, 0.25, 0.1]} material={accentMaterial}>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>
        <mesh position={[0.45, 0.25, 0.1]} material={accentMaterial}>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>

        {/* Upper arms */}
        <mesh position={[-0.48, -0.1, 0]} material={darkMaterial}>
          <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
        </mesh>
        <mesh position={[0.48, -0.1, 0]} material={darkMaterial}>
          <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
        </mesh>

        {/* Forearms */}
        <mesh position={[-0.48, -0.4, 0.05]} material={darkMaterial}>
          <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
        </mesh>
        <mesh position={[0.48, -0.4, 0.05]} material={darkMaterial}>
          <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
        </mesh>

        {/* Hands */}
        <mesh position={[-0.48, -0.62, 0.08]} material={darkMaterial}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
        <mesh position={[0.48, -0.62, 0.08]} material={darkMaterial}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.5, 0]} material={darkMaterial}>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
        </mesh>

        {/* Neck accent ring */}
        <mesh position={[0, 0.55, 0]} material={accentMaterial}>
          <torusGeometry args={[0.09, 0.015, 8, 32]} />
        </mesh>
      </group>

      {/* Head group — follows mouse */}
      <group ref={headRef} position={[0, 0.65, 0]}>
        {/* Main head */}
        <mesh position={[0, 0, 0]} material={darkMaterial}>
          <sphereGeometry args={[0.28, 32, 32]} />
        </mesh>

        {/* Visor / face plate */}
        <mesh position={[0, 0.05, 0.18]} material={visorMaterial}>
          <boxGeometry args={[0.38, 0.18, 0.12]} />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEyeRef} position={[-0.18, 0.12, 0.24]} material={accentMaterial}>
          <sphereGeometry args={[0.04, 16, 16]} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.18, 0.12, 0.24]} material={accentMaterial}>
          <sphereGeometry args={[0.04, 16, 16]} />
        </mesh>

        {/* Eye glow */}
        <pointLight position={[-0.18, 0.12, 0.3]} color="#6d8dff" intensity={0.3} distance={0.5} />
        <pointLight position={[0.18, 0.12, 0.3]} color="#6d8dff" intensity={0.3} distance={0.5} />

        {/* Antenna */}
        <mesh position={[0, 0.32, 0]} material={accentMaterial}>
          <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
        </mesh>
        <mesh position={[0, 0.38, 0]} material={glowMaterial}>
          <sphereGeometry args={[0.02, 16, 16]} />
        </mesh>
        <pointLight position={[0, 0.38, 0]} color="#6d8dff" intensity={0.4} distance={0.4} />

        {/* Head accent lines */}
        <mesh position={[0, 0.15, -0.15]} material={accentMaterial}>
          <boxGeometry args={[0.2, 0.015, 0.015]} />
        </mesh>
      </group>

      {/* Hip */}
      <mesh position={[0, -0.45, 0]} material={darkMaterial}>
        <sphereGeometry args={[0.2, 24, 24]} />
      </mesh>

      {/* Upper legs */}
      <mesh position={[-0.15, -0.7, 0]} material={darkMaterial}>
        <capsuleGeometry args={[0.09, 0.3, 8, 16]} />
      </mesh>
      <mesh position={[0.15, -0.7, 0]} material={darkMaterial}>
        <capsuleGeometry args={[0.09, 0.3, 8, 16]} />
      </mesh>

      {/* Lower legs */}
      <mesh position={[-0.15, -1.0, 0.03]} material={darkMaterial}>
        <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
      </mesh>
      <mesh position={[0.15, -1.0, 0.03]} material={darkMaterial}>
        <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
      </mesh>

      {/* Knee accents */}
      <mesh position={[-0.15, -0.85, 0.08]} material={accentMaterial}>
        <sphereGeometry args={[0.035, 12, 12]} />
      </mesh>
      <mesh position={[0.15, -0.85, 0.08]} material={accentMaterial}>
        <sphereGeometry args={[0.035, 12, 12]} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.15, -1.22, 0.06]} material={darkMaterial}>
        <boxGeometry args={[0.12, 0.06, 0.18]} />
      </mesh>
      <mesh position={[0.15, -1.22, 0.06]} material={darkMaterial}>
        <boxGeometry args={[0.12, 0.06, 0.18]} />
      </mesh>

      {/* Glowing platform */}
      <mesh position={[0, -1.28, 0]} rotation={[-Math.PI / 2, 0, 0]} material={glowMaterial}>
        <ringGeometry args={[0.4, 0.7, 64]} />
      </mesh>
      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} material={accentMaterial}>
        <ringGeometry args={[0.35, 0.38, 64]} />
      </mesh>
    </group>
  )
}
