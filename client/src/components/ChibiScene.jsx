import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ChibiScene = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div
        style={{ y, rotate, position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="glass-panel" style={{
          padding: '2rem',
          borderRadius: '30px',
          border: '1px solid var(--accent)',
          background: 'rgba(255,255,255,0.05)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          position: 'relative'
        }}>
          <img 
            src="/images/chibi_celebration.png" 
            alt="Chibi Celebration"
            style={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '20px',
              display: 'block'
            }}
          />
          
          {/* Animated Glow Overlay */}
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </motion.div>

      {/* Decorative Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ marginTop: '3rem', textAlign: 'center' }}
      >
        <h2 className="cursive" style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }}>
          Our Sweet Bonds
        </h2>
        <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Side by side, heart to heart
        </p>
      </motion.div>

      {/* Background Floating Elements */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.5 }}>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <div style={{ fontSize: '3rem' }}>🌸</div>
        </motion.div>
      </div>
      <div style={{ position: 'absolute', bottom: '20%', left: '10%', opacity: 0.5 }}>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <div style={{ fontSize: '4rem' }}>💖</div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChibiScene;
