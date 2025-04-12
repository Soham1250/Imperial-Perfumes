'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Group } from 'three'

// Simple bottle model using basic Three.js geometries instead of loading a GLTF
function BottleModel({ rotate = true, bottleColor = '#D4AF37', liquidColor = '#FFD700', capColor = '#1A1A1A' }) {
  const bottleRef = useRef<Group>(null)
  
  // Rotate the bottle slowly if rotate is true
  useFrame((state) => {
    if (bottleRef.current && rotate) {
      bottleRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })
  
  return (
    <group ref={bottleRef} position={[0, -0.5, 0]}>
      {/* Bottle base */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 1.5, 32]} />
        <meshPhysicalMaterial 
          color={bottleColor}
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
        />
      </mesh>
      
      {/* Bottle neck */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.5, 0.5, 32]} />
        <meshPhysicalMaterial 
          color={bottleColor}
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
        />
      </mesh>
      
      {/* Bottle top neck */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.3, 32]} />
        <meshPhysicalMaterial 
          color={bottleColor}
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
        />
      </mesh>
      
      {/* Liquid inside */}
      <mesh position={[0, 0, 0]} scale={[0.95, 0.6, 0.95]}>
        <cylinderGeometry args={[0.7, 0.7, 1.5, 32]} />
        <meshPhysicalMaterial 
          color={liquidColor}
          metalness={0.1}
          roughness={0.2}
          transmission={0.9}
        />
      </mesh>
      
      {/* Cap */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
        <meshStandardMaterial 
          color={capColor}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Cap top */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.2, 32]} />
        <meshStandardMaterial 
          color={capColor}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

export default function PerfumeBottle({ 
  interactive = true,
  bottleColor = '#D4AF37',
  liquidColor = '#FFD700',
  capColor = '#1A1A1A'
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-[500px] md:h-[600px]"
    >
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <BottleModel 
          rotate={!interactive} 
          bottleColor={bottleColor}
          liquidColor={liquidColor}
          capColor={capColor}
        />
        
        {interactive && <OrbitControls enableZoom={true} enablePan={false} />}
        
        <ContactShadows 
          rotation-x={Math.PI / 2}
          position={[0, -1.4, 0]}
          opacity={0.75}
          width={10}
          height={10}
          blur={2.5}
          far={1.4}
        />
        
        <Environment preset="city" />
      </Canvas>
    </motion.div>
  )
}
