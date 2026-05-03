import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import './CinematicIntro.css';

// 3D Floating Crystal Heart for intro
function IntroCrystal() {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2);
    }
  });

  return (
    <group>
      {/* Inner glow sphere */}
      <mesh ref={glowRef} scale={1.8}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.04} />
      </mesh>

      {/* Main crystal diamond */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <MeshDistortMaterial
          color="#f43f5e"
          emissive="#ec4899"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={1}
          distort={0.15}
          speed={3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.25, 0]} />
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Orbiting ring 1 */}
      <OrbitRing radius={2} speed={0.8} color="#f43f5e" tilt={Math.PI / 4} />
      <OrbitRing radius={2.5} speed={-0.5} color="#a855f7" tilt={-Math.PI / 3} />
      <OrbitRing radius={1.8} speed={1.2} color="#fbbf24" tilt={Math.PI / 6} />

      {/* Sparkles around crystal */}
      <Sparkles count={80} scale={6} size={4} color="#f43f5e" speed={0.8} />
      <Sparkles count={40} scale={5} size={3} color="#fbbf24" speed={0.5} />
      <Sparkles count={60} scale={7} size={2} color="#a855f7" speed={0.6} />

      {/* Lights */}
      <pointLight position={[3, 3, 3]} color="#f43f5e" intensity={2} distance={10} />
      <pointLight position={[-3, -2, 2]} color="#a855f7" intensity={1.5} distance={8} />
      <pointLight position={[0, 4, -3]} color="#fbbf24" intensity={1} distance={8} />
    </group>
  );
}

// Orbiting ring of particles
function OrbitRing({ radius, speed, color, tilt }) {
  const groupRef = useRef();
  const particleCount = 24;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.4 + Math.sin(angle) * 0.3}
            />
          </mesh>
        );
      })}
      {/* Ring line */}
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

const CinematicIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleTap = () => {
    if (phase >= 2) {
      setPhase(3);
      setTimeout(onComplete, 1200);
    }
  };

  return (
    <AnimatePresence>
      {phase < 3 ? (
        <motion.div
          className="cinematic-intro"
          onClick={handleTap}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* 3D Crystal Background */}
          <div className="intro-3d-bg">
            <Canvas
              camera={{ position: [0, 0, 6], fov: 45 }}
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.15} />
              <Stars radius={80} depth={60} count={2000} factor={5} saturation={0.5} fade speed={1.5} />
              <IntroCrystal />
            </Canvas>
          </div>

          <div className="intro-content">
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  className="intro-text-container"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  <motion.p
                    className="intro-pretext"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    A letter written in light
                  </motion.p>
                  
                  <motion.h1
                    className="intro-title"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    For My Sister
                  </motion.h1>
                  
                  <motion.p
                    className="intro-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    ✨ With all my love ✨
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase >= 2 && (
                <motion.button
                  className="tap-to-begin"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="tap-icon">💖</span>
                  <span>Tap to Begin</span>
                  <div className="tap-pulse" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Sparkle particles */}
          <div className="intro-sparkles">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="intro-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CinematicIntro;
