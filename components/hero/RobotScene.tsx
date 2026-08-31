'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import { InteractiveRobot } from './InteractiveRobot'

interface RobotSceneProps {
  mouseX: number
  mouseY: number
  isMoving: boolean
}

function SceneContent({ mouseX, mouseY, isMoving }: RobotSceneProps) {
  return (
    <>
      <ambientLight intensity={0.15} color="#ffffff" />

      {/* Key light — soft front */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
      />

      {/* Rim light — electric blue */}
      <directionalLight
        position={[-3, 2, -4]}
        intensity={0.6}
        color="#6d8dff"
      />

      {/* Accent fill — subtle blue */}
      <directionalLight
        position={[0, -1, 3]}
        intensity={0.2}
        color="#6d8dff"
      />

      {/* Bottom glow */}
      <pointLight position={[0, -2, 0]} color="#6d8dff" intensity={1.2} distance={4} />

      {/* Head light for drama */}
      <spotLight
        position={[0, 5, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.5}
        color="#ffffff"
        castShadow={false}
      />

      <Float speed={0.6} rotationIntensity={0} floatIntensity={0.15} floatingRange={[-0.02, 0.02]}>
        <InteractiveRobot mouseX={mouseX} mouseY={mouseY} isMoving={isMoving} />
      </Float>

      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.35}
        scale={5}
        blur={2.5}
        far={4}
        color="#6d8dff"
      />

      <Environment preset="city" environmentIntensity={0.15} />
    </>
  )
}

export function RobotScene({ mouseX, mouseY, isMoving }: RobotSceneProps) {
  return (
    <div className="w-full h-full" style={{ minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent mouseX={mouseX} mouseY={mouseY} isMoving={isMoving} />
        </Suspense>
      </Canvas>
    </div>
  )
}
