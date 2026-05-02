import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CinematicIntro from './components/CinematicIntro';
import HeroSection from './components/HeroSection';
import GiftBox from './components/GiftBox';
import MemorySlideshow from './components/MemorySlideshow';
import FinalSection from './components/FinalSection';
import Floating3DHearts from './components/Floating3DHearts';

// Ambient floating orbs for the background
const AmbientBackground = () => {
  return (
    <div className="background-mesh">
      <motion.div
        animate={{ 
          x: ['-5vw', '5vw', '-5vw'],
          y: ['-5vh', '5vh', '-5vh'],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', top: '20%', left: '30%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
          filter: 'blur(100px)', zIndex: -1
        }}
      />
      <motion.div
        animate={{ 
          x: ['5vw', '-5vw', '5vw'],
          y: ['5vh', '-5vh', '5vh'],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', bottom: '10%', right: '20%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 60%)',
          filter: 'blur(120px)', zIndex: -1
        }}
      />
    </div>
  );
};

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef(null);

  const startExperience = () => {
    setIntroFinished(true);
    setIsPlayingMusic(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <>
      <AmbientBackground />
      <Floating3DHearts />
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <audio 
          ref={audioRef} 
          src="/music/background.mp3" 
          loop 
          style={{ display: 'none' }} 
        />
        
        {!introFinished && <CinematicIntro onComplete={startExperience} />}
        
        {introFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <HeroSection />
            <GiftBox />
            <MemorySlideshow />
            <FinalSection />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default App;
