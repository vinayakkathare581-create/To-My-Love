import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import './HeroSection.css';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && titleRef.current) {
      // GSAP sparkle animation on the title
      const letters = titleRef.current.querySelectorAll('.hero-letter');
      gsap.fromTo(letters, 
        { opacity: 0, y: 40, rotateX: -90 },
        { 
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [isInView]);

  const titleText = "Happy Birthday My Everything";
  const words = titleText.split(' ');

  return (
    <section className="hero-section" ref={sectionRef} id="hero">
      {/* Decorative elements */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        >
          <span>🎂</span>
          <span>Special Day</span>
        </motion.div>

        <h1 className="hero-title" ref={titleRef}>
          {words.map((word, wi) => (
            <span key={wi} className="hero-word">
              {word.split('').map((letter, li) => (
                <span key={`${wi}-${li}`} className="hero-letter">
                  {letter}
                </span>
              ))}
              {wi < words.length - 1 && <span className="hero-letter">&nbsp;</span>}
            </span>
          ))}
          <span className="hero-emoji"> 💖</span>
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Today we celebrate the most beautiful soul I know
        </motion.p>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>

      {/* Floating decorations */}
      <div className="hero-decorations">
        {['🌸', '✨', '🦋', '💫', '🌟', '💝', '🎀', '🌺'].map((emoji, i) => (
          <motion.span
            key={i}
            className="hero-float-emoji"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            style={{
              left: `${10 + i * 11}%`,
              top: `${20 + Math.sin(i * 1.5) * 30}%`,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
