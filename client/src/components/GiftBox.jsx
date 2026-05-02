import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative'
    }}>
      <div className="glass-panel" style={{
        padding: '4rem 3rem',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(212,175,55,0.2)'
      }}>
        {/* Glow effect behind */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '200px', height: '200px', background: 'var(--accent-glow)', filter: 'blur(80px)', zIndex: -1,
          opacity: isOpen ? 1 : 0.3, transition: 'opacity 2s ease'
        }} />

        <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3rem', color: 'var(--text-muted)' }}>
          A Special Note
        </h2>
        
        <div 
          onClick={handleOpen}
          style={{
            cursor: isOpen ? 'default' : 'pointer',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '3rem',
            position: 'relative'
          }}
        >
          {!isOpen && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ 
                width: '60px', height: '60px', border: '1px solid var(--accent)', 
                transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px var(--accent-glow)'
              }}
            >
              <div style={{ width: '40px', height: '40px', border: '1px solid rgba(212,175,55,0.5)' }} />
            </motion.div>
          )}

          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="cursive"
              style={{ fontSize: '4rem', color: 'var(--accent)', textShadow: '0 0 20px var(--accent-glow)', lineHeight: 1 }}
            >
              To You
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              style={{ padding: '1rem 0' }}
            >
              <p style={{ color: 'var(--text-main)', lineHeight: 2, fontSize: '1.1rem', fontWeight: 300 }}>
                Every single day with you is a gift. Thank you for always being there, for the endless laughter, and for just being the extraordinary person you are.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tap to Reveal</p>
        )}
      </div>
    </section>
  );
};

export default GiftBox;
