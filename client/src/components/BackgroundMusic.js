import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element with a royalty-free melody using Web Audio API
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // We'll create a simple ambient melody
    const createMelody = () => {
      const notes = [
        { freq: 523.25, duration: 0.8, delay: 0 },    // C5
        { freq: 659.25, duration: 0.8, delay: 0.8 },   // E5
        { freq: 783.99, duration: 0.8, delay: 1.6 },   // G5
        { freq: 659.25, duration: 0.8, delay: 2.4 },   // E5
        { freq: 523.25, duration: 0.8, delay: 3.2 },   // C5
        { freq: 392.00, duration: 0.8, delay: 4.0 },   // G4
        { freq: 440.00, duration: 0.8, delay: 4.8 },   // A4
        { freq: 523.25, duration: 1.2, delay: 5.6 },   // C5
      ];

      notes.forEach(({ freq, duration, delay }) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + delay + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
      });
    };

    audioRef.current = { audioCtx, createMelody };

    return () => {
      audioCtx.close();
    };
  }, []);

  const toggleMusic = () => {
    if (!isPlaying && audioRef.current) {
      if (audioRef.current.audioCtx.state === 'suspended') {
        audioRef.current.audioCtx.resume();
      }
      audioRef.current.createMelody();
      // Loop it
      const loopInterval = setInterval(() => {
        if (audioRef.current) {
          audioRef.current.createMelody();
        }
      }, 7000);
      audioRef.current.loopInterval = loopInterval;
    } else if (audioRef.current?.loopInterval) {
      clearInterval(audioRef.current.loopInterval);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="music-control"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="music-btn"
            onClick={toggleMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            <div className={`music-icon ${isPlaying ? 'playing' : ''}`}>
              <span className="music-bar" />
              <span className="music-bar" />
              <span className="music-bar" />
            </div>
          </motion.button>
          
          <button
            className="music-close"
            onClick={() => {
              setIsVisible(false);
              if (audioRef.current?.loopInterval) {
                clearInterval(audioRef.current.loopInterval);
              }
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackgroundMusic;
