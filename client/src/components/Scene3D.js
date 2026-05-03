import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sparkles, OrbitControls, Trail, Environment } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import './Scene3D.css';

// ============ MASSIVE HEART with pulse glow ============
function GlowingHeart({ position, scale = 1 }) {
  const meshRef = useRef();
  const glowRef = useRef();

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.1, y, x, y);
    shape.bezierCurveTo(x - 0.15, y, x - 0.15, y + 0.175, x - 0.15, y + 0.175);
    shape.bezierCurveTo(x - 0.15, y + 0.275, x - 0.075, y + 0.408, x + 0.25, y + 0.525);
    shape.bezierCurveTo(x + 0.575, y + 0.408, x + 0.65, y + 0.275, x + 0.65, y + 0.175);
    shape.bezierCurveTo(x + 0.65, y + 0.175, x + 0.65, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 2,
    depth: 0.25,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 12,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      // Heartbeat pulse
      const pulse = 1 + Math.sin(t * 2.5) * 0.05;
      meshRef.current.scale.setScalar(scale * pulse);
    }
    if (glowRef.current) {
      const glowPulse = 1.6 + Math.sin(t * 2.5) * 0.3;
      glowRef.current.scale.setScalar(glowPulse);
      glowRef.current.material.opacity = 0.04 + Math.sin(t * 2.5) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={position}>
        {/* Outer glow */}
        <mesh ref={glowRef} scale={1.6}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#f43f5e" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
        {/* Main heart */}
        <mesh ref={meshRef} rotation={[0, 0, Math.PI]}>
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          <MeshDistortMaterial
            color="#f43f5e"
            emissive="#ec4899"
            emissiveIntensity={0.5}
            roughness={0.08}
            metalness={0.95}
            distort={0.08}
            speed={3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ============ BIRTHDAY CAKE with candles and glow ============
function BirthdayCake({ position }) {
  const groupRef = useRef();
  const flameRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.15;
    }
    // Flickering flames
    flameRefs.current.forEach((flame, i) => {
      if (flame) {
        const flicker = 0.8 + Math.sin(t * 8 + i * 2) * 0.3;
        flame.scale.setScalar(flicker);
        flame.material.emissiveIntensity = 1.5 + Math.sin(t * 10 + i) * 0.8;
      }
    });
  });

  const candlePositions = [
    [0, 1.15, 0],
    [0.2, 1.15, 0.15],
    [-0.15, 1.15, -0.1],
  ];

  return (
    <Float speed={1} floatIntensity={0.2}>
      <group ref={groupRef} position={position}>
        {/* Plate/base */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[1.1, 1.2, 0.1, 32]} />
          <meshStandardMaterial color="#f0e6d3" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Bottom layer — chocolate */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.95, 0.55, 32]} />
          <meshStandardMaterial color="#8B4513" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Bottom frosting ring */}
        <mesh position={[0, 0.28, 0]}>
          <torusGeometry args={[0.9, 0.04, 8, 32]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.2} roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Middle layer — strawberry */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.7, 0.75, 0.45, 32]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Middle frosting drip effect */}
        <mesh position={[0, 0.73, 0]}>
          <torusGeometry args={[0.7, 0.035, 8, 32]} />
          <meshStandardMaterial color="#fde68a" emissive="#fbbf24" emissiveIntensity={0.15} roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Top layer — pink */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.5, 0.55, 0.35, 32]} />
          <meshStandardMaterial color="#ec4899" roughness={0.3} metalness={0.35} />
        </mesh>
        {/* Top frosting dome */}
        <mesh position={[0, 1.08, 0]}>
          <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fce7f3" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Candles + flames */}
        {candlePositions.map((pos, i) => (
          <group key={i}>
            <mesh position={pos}>
              <cylinderGeometry args={[0.025, 0.025, 0.35, 8]} />
              <meshStandardMaterial color="#fef3c7" />
            </mesh>
            {/* Flame */}
            <mesh
              position={[pos[0], pos[1] + 0.22, pos[2]]}
              ref={(el) => (flameRefs.current[i] = el)}
            >
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#ff6b00"
                emissiveIntensity={2}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Flame light */}
            <pointLight
              position={[pos[0], pos[1] + 0.25, pos[2]]}
              color="#fbbf24"
              intensity={0.5}
              distance={2}
            />
          </group>
        ))}

        {/* Decorative stars on cake */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={`star-${i}`}
              position={[
                Math.cos(angle) * 0.85,
                0.15 + Math.sin(angle * 3) * 0.05,
                Math.sin(angle) * 0.85,
              ]}
              scale={0.05}
            >
              <octahedronGeometry />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#fbbf24"
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// ============ GIFT BOX with animated lid ============
function GiftBox3D({ position }) {
  const groupRef = useRef();
  const lidRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.2;
    }
    if (lidRef.current) {
      // Slight bobbing of lid
      lidRef.current.position.y = 0.42 + Math.sin(t * 1.5) * 0.03;
      lidRef.current.rotation.z = Math.sin(t * 0.8) * 0.03;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Box base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.7, 0.8]} />
          <meshStandardMaterial
            color="#7c3aed"
            roughness={0.15}
            metalness={0.7}
          />
        </mesh>
        {/* Ribbon horizontal */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.82, 0.14, 0.82]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
        {/* Ribbon vertical */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.72, 0.82]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
        {/* Lid */}
        <group ref={lidRef} position={[0, 0.42, 0]}>
          <mesh>
            <boxGeometry args={[0.88, 0.12, 0.88]} />
            <meshStandardMaterial
              color="#8b5cf6"
              roughness={0.15}
              metalness={0.7}
            />
          </mesh>
          {/* Bow */}
          <mesh position={[0, 0.12, 0]}>
            <torusGeometry args={[0.12, 0.04, 8, 16]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
        </group>

        {/* Sparkle glow */}
        <pointLight position={[0, 0.5, 0]} color="#a855f7" intensity={0.8} distance={3} />
      </group>
    </Float>
  );
}

// ============ ORBITING PARTICLES SYSTEM ============
function OrbitParticles({ count = 60, radius = 4, speed = 0.3 }) {
  const groupRef = useRef();
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      angle: (i / count) * Math.PI * 2,
      y: (Math.random() - 0.5) * 3,
      r: radius + (Math.random() - 0.5) * 1.5,
      speed: speed + (Math.random() - 0.5) * 0.2,
      size: 0.02 + Math.random() * 0.04,
      hue: Math.random() > 0.5 ? '#f43f5e' : Math.random() > 0.5 ? '#a855f7' : '#fbbf24',
    }));
  }, [count, radius, speed]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        const angle = p.angle + t * p.speed;
        child.position.x = Math.cos(angle) * p.r;
        child.position.z = Math.sin(angle) * p.r;
        child.position.y = p.y + Math.sin(t * 0.5 + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color={p.hue} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ============ FLOATING RINGS ============
function FloatingRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.15;
      ring1Ref.current.rotation.y = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * -0.1;
      ring2Ref.current.rotation.z = t * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.08;
      ring3Ref.current.rotation.z = t * -0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[4, 0.012, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[4.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.08} />
      </mesh>
    </>
  );
}

// ============ SHOOTING STAR ============
function ShootingStar() {
  const ref = useRef();
  const trailActive = useRef(true);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      // Periodic shooting star trajectory
      const cycle = t % 8;
      if (cycle < 2) {
        const progress = cycle / 2;
        ref.current.position.x = -6 + progress * 12;
        ref.current.position.y = 4 - progress * 3;
        ref.current.position.z = -2 + progress * 1;
        ref.current.visible = true;
      } else {
        ref.current.visible = false;
      }
    }
  });

  return (
    <Trail
      width={1.5}
      length={6}
      color="#fbbf24"
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
    </Trail>
  );
}

// ============ MAIN SCENE ============
function SceneContent() {
  return (
    <>
      {/* Cinematic lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        color="#fce7f3"
        castShadow
      />
      <pointLight position={[-4, 4, -4]} intensity={0.8} color="#a855f7" />
      <pointLight position={[4, -3, 4]} intensity={0.5} color="#f43f5e" />
      <spotLight
        position={[0, 6, 0]}
        angle={0.3}
        penumbra={0.8}
        intensity={0.6}
        color="#fbbf24"
      />
      
      {/* Deep space background */}
      <Stars radius={60} depth={60} count={2500} factor={5} saturation={0.5} fade speed={1} />
      
      {/* Sparkle systems */}
      <Sparkles count={80} scale={10} size={4} color="#f43f5e" speed={0.5} />
      <Sparkles count={50} scale={10} size={3} color="#a855f7" speed={0.4} />
      <Sparkles count={40} scale={8} size={2} color="#fbbf24" speed={0.6} />
      
      {/* Floating rings */}
      <FloatingRings />
      
      {/* Orbiting particle system */}
      <OrbitParticles />
      
      {/* Shooting star */}
      <ShootingStar />
      
      {/* Main objects */}
      <GlowingHeart position={[0, 0.8, 0]} scale={2} />
      <BirthdayCake position={[-3, -0.8, -0.5]} />
      <GiftBox3D position={[3, -0.3, -0.5]} />
      
      {/* Small orbiting hearts */}
      <GlowingHeart position={[-2, 2, -2]} scale={0.5} />
      <GlowingHeart position={[2.2, 1.8, -1.8]} scale={0.4} />
      <GlowingHeart position={[0, -1.5, -3]} scale={0.3} />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

const Scene3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className="scene3d-section" ref={sectionRef} id="scene3d">
      {/* Section glow */}
      <div className="scene3d-glow scene3d-glow-1" />
      <div className="scene3d-glow scene3d-glow-2" />

      <motion.div
        className="scene3d-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="scene3d-badge">✨ Interactive 3D</span>
        <h2 className="section-title">A Universe Of Love</h2>
        <p className="section-subtitle">Drag to explore this magical world made just for you 🌌</p>
      </motion.div>

      <motion.div
        className="scene3d-canvas-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="scene3d-canvas-glow" />
        <Canvas
          camera={{ position: [0, 1.5, 7], fov: 50 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          shadows
        >
          <SceneContent />
        </Canvas>
        <div className="scene3d-overlay">
          <div className="scene3d-overlay-dot" />
          <span>Drag to orbit • Auto-rotating</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Scene3D;
