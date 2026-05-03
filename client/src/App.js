import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import CinematicIntro from './components/CinematicIntro';
import ParticleBackground from './components/ParticleBackground';
import BackgroundMusic from './components/BackgroundMusic';

// Lazy-loaded sections
const HeroSection = lazy(() => import('./components/HeroSection'));
const GiftBoxSurprise = lazy(() => import('./components/GiftBoxSurprise'));

// Loading fallback
const SectionLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40vh',
    padding: '2rem'
  }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '3px solid rgba(244, 63, 94, 0.2)',
        borderTopColor: '#f43f5e',
      }}
    />
  </div>
);

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (introComplete) {
      // Small delay before showing content for smooth transition
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <div className="app" ref={mainRef}>
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        {!introComplete && (
          <CinematicIntro key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {showContent && (
        <motion.main
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <BackgroundMusic />
          
          <Suspense fallback={<SectionLoader />}>
            <HeroSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <GiftBoxSurprise />
          </Suspense>
        </motion.main>
      )}
    </div>
  );
}

export default App;
