import React, { useRef, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import './FinalSection.css';

// 3D Pulsing Crystal Heart for the final section
function FinalHeart() {
  const meshRef = useRef();
  const wireRef = useRef();
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
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 12,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
      // Heartbeat
      const beat = 1 + Math.sin(t * 2) * 0.06;
      meshRef.current.scale.setScalar(beat * 2);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.3;
      wireRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
      wireRef.current.scale.setScalar((1 + Math.sin(t * 2) * 0.06) * 2.05);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(2.5 + Math.sin(t * 2) * 0.4);
      glowRef.current.material.opacity = 0.03 + Math.sin(t * 2) * 0.02;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, 0.3, 0]}>
        {/* Glow sphere */}
        <mesh ref={glowRef} scale={2.5}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial color="#f43f5e" transparent opacity={0.04} side={THREE.BackSide} />
        </mesh>

        {/* Main heart */}
        <mesh ref={meshRef} scale={2} rotation={[0, 0, Math.PI]}>
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          <MeshDistortMaterial
            color="#f43f5e"
            emissive="#ec4899"
            emissiveIntensity={0.6}
            roughness={0.05}
            metalness={1}
            distort={0.12}
            speed={2.5}
          />
        </mesh>

        {/* Wireframe */}
        <mesh ref={wireRef} scale={2.05} rotation={[0, 0, Math.PI]}>
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.08} />
        </mesh>

        {/* Orbiting particles */}
        <OrbitDots radius={1.5} count={16} color="#f43f5e" speed={0.6} />
        <OrbitDots radius={1.8} count={12} color="#a855f7" speed={-0.4} tilt={Math.PI / 3} />

        <Sparkles count={60} scale={5} size={3} color="#f43f5e" speed={0.5} />
        <Sparkles count={40} scale={4} size={2} color="#fbbf24" speed={0.7} />

        <pointLight position={[2, 2, 2]} color="#f43f5e" intensity={1.5} distance={8} />
        <pointLight position={[-2, -1, 2]} color="#a855f7" intensity={1} distance={6} />
      </group>
    </Float>
  );
}

function OrbitDots({ radius, count, color, speed, tilt = 0 }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });
  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        );
      })}
      <mesh>
        <torusGeometry args={[radius, 0.004, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

const FinalSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView && textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: 'power3.out',
        }
      );
    }
  }, [isInView]);

  return (
    <section className="final-section" ref={sectionRef} id="final">
      {/* Ambient background */}
      <div className="final-glow final-glow-1" />
      <div className="final-glow final-glow-2" />
      <div className="final-glow final-glow-3" />

      {/* 3D Heart Background */}
      <div className="final-3d-bg">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.15} />
          <Stars radius={50} depth={50} count={1500} factor={4} saturation={0.3} fade speed={0.8} />
          <FinalHeart />
        </Canvas>
      </div>

      {/* Floating hearts */}
      <div className="final-hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.span
            key={i}
            className="final-heart"
            style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              fontSize: `${0.8 + Math.random() * 1.5}rem`,
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.25 } : {}}
            transition={{ delay: Math.random() * 2 }}
          >
            💖
          </motion.span>
        ))}
      </div>

      <div className="final-content" ref={textRef}>
        <motion.div
          className="final-emoji"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
        >
          ✨💖✨
        </motion.div>

        <h2 className="final-title">
          You Are My Greatest Treasure
        </h2>

        <p className="final-message">
          In a universe of infinite possibilities, having you as my sister 
          is the most beautiful miracle of all. Every moment with you is a 
          gift I will cherish forever.
        </p>

        <div className="final-signature">
          <span className="final-heart-icon">💝</span>
          <p className="final-sign-text">
            With all my love, today and always
          </p>
          <p className="final-sign-name">
            ~ Your loving sibling
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="final-footer">
        <p>Made with 💖 and infinite love</p>
      </div>
    </section>
  );
};

export default FinalSection;
