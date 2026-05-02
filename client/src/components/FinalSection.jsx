import React from 'react';
import { motion } from 'framer-motion';

const FinalSection = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 2rem',
      position: 'relative'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="glass-panel"
        style={{
          maxWidth: '800px',
          padding: '4rem 3rem',
          border: '1px solid var(--accent)',
          background: 'rgba(0,0,0,0.6)',
          boxShadow: '0 0 50px rgba(212, 175, 55, 0.2)'
        }}
      >
        <h2 className="cursive" style={{ fontSize: '3.5rem', color: 'var(--accent)', marginBottom: '2rem' }}>
          ನನ್ನ ಪ್ರಿಯ ತಂಗಿಗೆ 💖
        </h2>

        <div style={{ fontSize: '1.2rem', lineHeight: '2', color: '#fff', marginBottom: '3rem', whiteSpace: 'pre-line' }}>
          <p style={{ color: 'var(--accent)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            ಹುಟ್ಟುಹಬ್ಬದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು 🎂✨
          </p>
          
          ನೀನು ನನ್ನ ತಂಗಿ ಮಾತ್ರ ಅಲ್ಲ, ನನ್ನ ಜೀವನದಲ್ಲಿ ಒಂದು ತಾಯಿಯಂತೆಯೂ ಇದ್ದೀಯ.{"\n"}
          ನನ್ನನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ, ಕಾಳಜಿ ವಹಿಸುವ, ನನ್ನ ಸಂತೋಷಕ್ಕಾಗಿ ಸದಾ ಯೋಚಿಸುವವಳು ನೀನೇ.{"\n"}{"\n"}

          ನಿನ್ನ ನಗು ನನ್ನ ದಿನವನ್ನು ಬೆಳಗಿಸುತ್ತದೆ,{"\n"}
          ನಿನ್ನ ಪ್ರೀತಿ ನನ್ನ ಮನಸ್ಸಿಗೆ ಶಾಂತಿ ಕೊಡುತ್ತದೆ.{"\n"}
          ನಾನು ನಿನ್ನ ಅಣ್ಣನಾಗಿರುವುದು ನನ್ನ ದೊಡ್ಡ ಹೆಮ್ಮೆ.{"\n"}{"\n"}

          ನಾವು ಕೆಲವೊಮ್ಮೆ ಜಗಳ ಮಾಡಿದರೂ,{"\n"}
          ನಿನ್ನ ಜೊತೆ ಕಳೆದ ಪ್ರತಿಯೊಂದು ಕ್ಷಣವೂ ನನಗೆ ಅಮೂಲ್ಯ 😊{"\n"}
          ಯಾಕೆಂದರೆ, ನೀನು ನನ್ನ ಜೀವನದ ಅತ್ಯಂತ ಮುಖ್ಯ ವ್ಯಕ್ತಿ.{"\n"}{"\n"}

          ನೀನು ಯಾವಾಗಲೂ ಖುಷಿಯಾಗಿರಬೇಕು,{"\n"}
          ನಿನ್ನ ಎಲ್ಲಾ ಕನಸುಗಳು ನನಸಾಗಬೇಕು.{"\n"}
          ನಿನ್ನ ಜೀವನವು ಪ್ರೀತಿ, ಸಂತೋಷ ಮತ್ತು ಯಶಸ್ಸಿನಿಂದ ತುಂಬಿರಲಿ 💫{"\n"}{"\n"}

          ನೀನು ನನ್ನ ಎಲ್ಲವೂ… 💖{"\n"}
          ಎಂದಿಗೂ ನಿನ್ನ ಜೊತೆ ಇರುತ್ತೇನೆ.{"\n"}{"\n"}

          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
            ಮತ್ತೊಮ್ಮೆ ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು ನನ್ನ ಪ್ರಿಯ ತಂಗಿ 🎉💕
          </span>
        </div>

        <div style={{ textAlign: 'right', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ಪ್ರೀತಿಯಿಂದ</p>
          <p className="cursive" style={{ fontSize: '2rem', color: 'var(--accent)' }}>ನಿನ್ನ ಅಣ್ಣ 💙</p>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalSection;
