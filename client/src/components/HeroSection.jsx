import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      >
        <h2 style={{ fontSize: '1rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2rem' }}>
          Happy Birthday
        </h2>
        <h1 className="cursive" style={{
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 400,
          marginBottom: '2rem',
          lineHeight: 1,
          color: 'var(--text-main)',
          textShadow: '0 0 40px rgba(255,255,255,0.2)'
        }}>
          My Beautiful Sister ❤️
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            fontWeight: 300,
            lineHeight: 1.8,
            letterSpacing: '0.05em'
          }}
        >
          To the person who brings light into every room, joy into every heart, 
          and meaning into my life. Today is a celebration of your radiant soul.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          color: 'rgba(255,255,255,0.4)'
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Discover</span>
        <motion.div 
          animate={{ height: ['0px', '40px', '0px'], opacity: [0, 1, 0], y: [0, 20, 40] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ width: '1px', background: 'var(--accent)' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
