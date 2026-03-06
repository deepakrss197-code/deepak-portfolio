import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Trail, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

const TechCore3D = () => {
  const coreRef = useRef();
  const groupRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      const targetY = clock.getElapsedTime() * 0.2 + (pointer.x * 0.5);
      const targetX = clock.getElapsedTime() * 0.1 - (pointer.y * 0.5);
      
      // Smooth interpolation for premium feel
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={groupRef}>
        {/* Outer glowing wireframe sphere */}
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial 
            color="#00ff9f" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </mesh>
        
        <Icosahedron ref={coreRef} args={[1.5, 0]} scale={1}>
          <MeshDistortMaterial
            color="#0a0a0a"
            emissive="#00ff9f"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={3}
          />
        </Icosahedron>
        
        {/* Orbiting particles/nodes can be added here if needed */}
      </group>
    </Float>
  );
};

export default TechCore3D;
