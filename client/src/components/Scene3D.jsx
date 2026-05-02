import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';

const SootSprite = ({ position }) => {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y += Math.sin(t * 2 + position[0]) * 0.005;
      group.current.rotation.z = Math.sin(t + position[1]) * 0.1;
    }
  });

  return (
    <group 
      ref={group} 
      position={position}
    >
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.15, 0.1, 0.22]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position={[-0.15, 0.1, 0.22]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      {/* Pupils */}
      <mesh position={[0.15, 0.1, 0.23]}>
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[-0.15, 0.1, 0.23]}>
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
};

const ForestSpirit = () => {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Main Body */}
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.8, 1.2, 32, 64]} />
        <meshStandardMaterial color="#8e8e8e" roughness={0.7} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, 0.8, 0.45]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[0.65, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fdfdfd" roughness={0.9} />
      </mesh>
      {/* Ears */}
      <mesh position={[0.4, 2, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
        <meshStandardMaterial color="#8e8e8e" />
      </mesh>
      <mesh position={[-0.4, 2, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
        <meshStandardMaterial color="#8e8e8e" />
      </mesh>
    </group>
  );
};

const Scene3D = () => {
  return (
    <section style={{ height: '70vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '2rem', left: '0', right: '0', textAlign: 'center', zIndex: 10 }}>
        <h2 className="cursive" style={{ fontSize: '2.5rem', color: 'var(--accent)', textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
          Spirit Garden
        </h2>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          A place of wonder and magic
        </p>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 40 }}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
          
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#fff" />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <ForestSpirit />
          </Float>

          <Float speed={3} rotationIntensity={2} floatIntensity={1}>
            <SootSprite position={[1.5, 2, 0]} />
          </Float>

          <Float speed={2.5} rotationIntensity={1} floatIntensity={0.8}>
            <SootSprite position={[-1.8, 1.5, 1]} />
          </Float>

          <Sparkles count={50} scale={10} size={1} speed={0.2} color="var(--accent)" />
          <Environment preset="forest" />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Scene3D;
