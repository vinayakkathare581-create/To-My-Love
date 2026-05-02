import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HeartShape = ({ position, size, speed, color }) => {
  const mesh = useRef();
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.5);
    s.bezierCurveTo(0, 0.5, -0.5, 1, -1, 0.5);
    s.bezierCurveTo(-1.5, 0, -1, -0.7, 0, -1.5);
    s.bezierCurveTo(1, -0.7, 1.5, 0, 1, 0.5);
    s.bezierCurveTo(0.5, 1, 0, 0.5, 0, 0.5);
    return new THREE.ExtrudeGeometry(s, { depth: 0.4, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * speed;
    mesh.current.rotation.z = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={mesh} position={position} scale={size} geometry={shape}>
        <MeshWobbleMaterial factor={0.6} speed={2} color={color} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
};

const Floating3DHearts = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.6
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff69b4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        
        <HeartShape position={[-4, 3, 0]} size={0.5} speed={0.5} color="#ff1493" />
        <HeartShape position={[5, -2, -2]} size={0.3} speed={0.8} color="#d4af37" />
        <HeartShape position={[-6, -4, 2]} size={0.4} speed={0.3} color="#ff69b4" />
        <HeartShape position={[7, 5, -5]} size={0.6} speed={0.2} color="#ffffff" />
        <HeartShape position={[2, 6, 0]} size={0.2} speed={1.2} color="#ffb6c1" />
      </Canvas>
    </div>
  );
};

export default Floating3DHearts;
