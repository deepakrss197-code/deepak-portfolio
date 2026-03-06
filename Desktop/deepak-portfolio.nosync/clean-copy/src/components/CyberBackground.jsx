import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const count = 2500;
const generatePositions = () => {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
      // Random spherical coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * 3.0; // radius 3.0

      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);     // x
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
      p[i * 3 + 2] = r * Math.cos(phi);                   // z
  }
  return p;
};
const positions = generatePositions();

const ParticleField = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.03;
      ref.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <points ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#00ff9f"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

const CyberBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030303]">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <ParticleField />
      </Canvas>
      {/* Overlay gradient to smoothly fade into standard background at bottom if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />
    </div>
  );
};

export default CyberBackground;
