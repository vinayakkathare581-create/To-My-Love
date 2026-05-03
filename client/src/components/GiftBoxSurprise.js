import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import MemorySection from './MemorySection';
import CinematicMessage from './CinematicMessage';
import './GiftBoxSurprise.css';

const GiftBoxSurprise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Play music
    try {
      const audio = new Audio('/audio/bdysong.mp3');
      audio.volume = 0.6;
      audio.play().catch(e => console.log('Audio autoplay blocked', e));
    } catch (error) {
      console.log('Audio playback error', error);
    }

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#3b82f6'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Show message after animation
    setTimeout(() => setShowMessage(true), 800);
  };

  return (
    <section className="gift-section section" ref={sectionRef} id="gift">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        A Special Gift For You
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Tap the gift to unwrap your surprise ✨
      </motion.p>

      <div className="gift-container">
        <motion.div
          className={`gift-box ${isOpen ? 'gift-opened' : ''}`}
          onClick={handleOpen}
          whileHover={!isOpen ? { 
            scale: 1.05, 
            rotateY: [-5, 5, -5],
            rotateX: [5, -5, 5],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          } : {}}
          whileTap={!isOpen ? { scale: 0.9, rotateX: 10 } : {}}
          initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
          transition={{ delay: 0.5, duration: 1.2, type: 'spring', bounce: 0.4 }}
        >
          {/* Gift box lid */}
          <div className="gift-lid">
            <div className="gift-lid-top" />
            <div className="gift-ribbon-bow">
              <div className="bow-left" />
              <div className="bow-right" />
              <div className="bow-center" />
            </div>
          </div>
          
          {/* Gift box base */}
          <div className="gift-base">
            <div className="gift-ribbon-v" />
            <div className="gift-ribbon-h" />
          </div>

          {/* Glow effect */}
          {!isOpen && (
            <div className="gift-glow" />
          )}

          {/* Sparkles on hover */}
          {!isOpen && (
            <div className="gift-sparkles">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="gift-sparkle" style={{
                  animationDelay: `${i * 0.5}s`,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 40}%`,
                }} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Cinematic Message below the Gift Box */}
        {!isOpen && (
          <CinematicMessage />
        )}

        {/* Message reveal */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="gift-message glass-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <div className="gift-message-emoji">🎉</div>
              <h3 className="gift-message-title">ನನ್ನ ಪ್ರಿಯ ತಂಗಿಗೆ 💖</h3>
              
              <div className="gift-message-text-kannada">
                <p>ಹುಟ್ಟುಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು 🎂✨</p>
                <p>ನೀನು ನನ್ನ ತಂಗಿ ಮಾತ್ರ ಅಲ್ಲ, ನನ್ನ ಜೀವನದಲ್ಲಿ ಒಂದು ತಾಯಿಯಂತೆಯೂ ಇದ್ದೀಯ.<br/>
                ನನ್ನನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ, ಕಾಳಜಿ ವಹಿಸುವ, ನನ್ನ ಸಂತೋಷಕ್ಕಾಗಿ ಸದಾ ಯೋಚಿಸುವವಳು ನೀನೇ.</p>
                
                <p>ನಿನ್ನ ನಗು ನನ್ನ ದಿನವನ್ನು ಬೆಳಗಿಸುತ್ತದೆ,<br/>
                ನಿನ್ನ ಪ್ರೀತಿ ನನ್ನ ಮನಸ್ಸಿಗೆ ಶಾಂತಿ ಕೊಡುತ್ತದೆ.<br/>
                ನಾನು ನಿನ್ನ ಅಣ್ಣನಾಗಿರುವುದು ನನ್ನ ದೊಡ್ಡ ಹೆಮ್ಮೆ.</p>

                <p>ನಾವು ಕೆಲವೊಮ್ಮೆ ಜಗಳ ಮಾಡಿದರೂ,<br/>
                ನಿನ್ನ ಜೊತೆ ಕಳೆದ ಪ್ರತಿಯೊಂದು ಕ್ಷಣವೂ ನನಗೆ ಅಮೂಲ್ಯ 😊<br/>
                ಯಾಕೆಂದರೆ, ನೀನು ನನ್ನ ಜೀವನದ ಅತ್ಯಂತ ಮುಖ್ಯ ವ್ಯಕ್ತಿ.</p>

                <p>ನೀನು ಯಾವಾಗಲೂ ಖುಷಿಯಾಗಿರಬೇಕು,<br/>
                ನಿನ್ನ ಎಲ್ಲಾ ಕನಸುಗಳು ನನಸಾಗಬೇಕು.<br/>
                ನಿನ್ನ ಜೀವನವು ಪ್ರೀತಿ, ಸಂತೋಷ ಮತ್ತು ಯಶಸ್ಸಿನಿಂದ ತುಂಬಿರಲಿ 💫</p>

                <p>ನೀನು ನನ್ನ ಎಲ್ಲವೂ… 💖<br/>
                ಎಂದಿಗೂ ನಿನ್ನ ಜೊತೆ ಇರುತ್ತೇನೆ.</p>

                <p>ಮತ್ತೊಮ್ಮೆ ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು ನನ್ನ ಪ್ರಿಯ ತಂಗಿ 🎉💕</p>
              </div>

              <div className="gift-message-footer">
                <div className="footer-sign">
                  <span>ಪ್ರೀತಿಯಿಂದ</span>
                  <span className="footer-name">ನಿನ್ನ ಅಣ್ಣ 💙</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Memory Section rendering after box opens */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="gift-memories-wrapper"
          >
            <MemorySection />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GiftBoxSurprise;
