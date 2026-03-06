import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Trail, Sphere } from "@react-three/drei";
import * as THREE from "three";
import useIsMobile from "../hooks/useIsMobile";

// --- Premium Particle Vortex Physics ---
const generateVortexParticles = (count) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    // Math logic for a swirling galactic arm structure
    const armCount = 5;
    const armIndex = i % armCount;
    const radius = Math.random() * 8 + 0.5; // Spread out up to 8 units
    const armAngle = (armIndex / armCount) * Math.PI * 2;
    const spinAngle = radius * 1.5; // Twist effect stronger towards edge
    const angle = armAngle + spinAngle + (Math.random() - 0.5) * 0.8;

    // Core gravity well (pinch z height based on radius)
    const height = (Math.random() - 0.5) * Math.max(0.1, 4 - radius / 2);

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = height;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    // Color gradient from core (white->green->dark)
    if (radius < 2) {
      color.setHex(0xffffff); // Core white hot
    } else if (radius < 5) {
      color.setHex(0x00ff9f); // Neon green mid ring
    } else {
      color.setHex(0x00cc88); // Deep edge green
    }

    // Add some random pure white sparklers
    if (Math.random() > 0.95) color.setHex(0xffffff);

    color.toArray(colors, i * 3);
    sizes[i] = Math.random() * 2;
  }
  return { positions, colors, sizes };
};

const ParticleVortex = () => {
  const pointsRef = useRef();
  const isMobile = useIsMobile();

  // Massively increased particle count for premium density, reduced for mobile
  const { positions, colors } = useMemo(
    () => generateVortexParticles(isMobile ? 1500 : 8000),
    [isMobile],
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Smooth magnetic tilt toward mouse pointer via R3F state
    const targetRotX = state.pointer.y * 0.5;
    const targetRotZ = state.pointer.x * 0.5;

    // Heavy continuous rotation
    pointsRef.current.rotation.y = time * 0.15;

    pointsRef.current.rotation.x +=
      (targetRotX - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.z +=
      (targetRotZ - pointsRef.current.rotation.z) * 0.05;

    // Optional: make individual particles pulse (can be heavy, doing a grouped sine wave instead)
    pointsRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group>
      {/* High density point cloud */}
      <Points
        ref={pointsRef}
        positions={positions}
        colors={colors}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          vertexColors
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Dark central gravity well sphere (the 'black hole') compressed and denser */}
      <Sphere args={[0.3, 32, 32]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>

      {/* Orbital light ring sweeping through the vortex */}
      <Trail width={1.5} color="#ffffff" length={4} decay={1} local>
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Trail>

      <Trail width={3} color="#00ff9f" length={6} decay={1} local>
        <mesh position={[-3, 0.5, 2]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#00ff9f" />
        </mesh>
      </Trail>
    </group>
  );
};

const Background3D = () => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.85] mix-blend-screen bg-[#020202]">
      {/* Feature 15: Hardware WebGL Check for Smartphones */}
      {isMobile ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,159,0.15)_0%,_transparent_60%)] animate-pulse" />
      ) : (
        <Canvas
          dpr={[1, 1.5]}
          eventSource={
            typeof window !== "undefined"
              ? document.getElementById("root")
              : undefined
          }
          eventPrefix="client"
          camera={{ position: [0, 5, 12], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <fog attach="fog" args={["#020202", 5, 25]} />
          <ambientLight intensity={0.2} />

          {/* Extreme Cinematic Lighting */}
          <directionalLight
            position={[0, -10, 0]}
            intensity={5}
            color="#00ff9f"
          />

          {/* White-Hot Core Light */}
          <pointLight
            position={[0, 0, 0]}
            intensity={10}
            color="#ffffff"
            distance={4}
          />

          {/* Neon Green Ambient Bloom Light */}
          <pointLight
            position={[0, 2, 0]}
            intensity={8}
            color="#00ff9f"
            distance={10}
          />

          <spotLight
            position={[5, 12, 5]}
            angle={0.8}
            penumbra={1}
            intensity={4}
            color="#ffffff"
          />

          <ParticleVortex />
        </Canvas>
      )}
    </div>
  );
};

export default Background3D;
