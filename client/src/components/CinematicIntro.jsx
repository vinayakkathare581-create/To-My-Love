import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicIntro = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleBegin = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2, ease: "easeInOut" } }}
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#020202', zIndex: 50 
          }}
        >
          {/* Subtle light pulse in center */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0.2] }} transition={{ duration: 4 }}
            style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 3, ease: "easeOut", delay: 1 }}
            style={{ textAlign: 'center', zIndex: 1 }}
          >
            <h1 className="cursive" style={{ 
              color: 'var(--accent)', fontSize: 'clamp(4rem, 8vw, 7rem)', 
              fontWeight: 400, textShadow: '0 0 20px rgba(212,175,55,0.3)',
              lineHeight: 1
            }}>
              For You ❤️
            </h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 3 }}
              style={{ color: '#fff', fontSize: '1rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '1rem', opacity: 0.7 }}
            >
              A celebration of everything you are.
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                onClick={handleBegin}
                className="shimmer-btn"
                style={{
                  marginTop: '5rem', padding: '12px 40px',
                  background: 'transparent', border: '1px solid rgba(212,175,55,0.3)',
                  color: 'var(--accent-light)', cursor: 'pointer',
                  fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  zIndex: 1, outline: 'none'
                }}
              >
                Enter Experience
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
