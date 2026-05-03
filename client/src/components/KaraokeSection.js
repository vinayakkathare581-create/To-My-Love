import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './KaraokeSection.css';

const lyrics = [
  { time: 0, text: "On this beautiful day," },
  { time: 3, text: "the stars align for you," },
  { time: 6, text: "every flower blooms," },
  { time: 9, text: "in shades of love so true." },
  { time: 12, text: "" },
  { time: 13, text: "You are the light," },
  { time: 16, text: "that guides my way," },
  { time: 19, text: "the warmth in every," },
  { time: 22, text: "cold and stormy day." },
  { time: 25, text: "" },
  { time: 26, text: "Happy birthday to you," },
  { time: 29, text: "my dearest one," },
  { time: 32, text: "may your wishes come true," },
  { time: 35, text: "like rays of the sun." },
  { time: 38, text: "" },
  { time: 39, text: "You deserve all the magic," },
  { time: 42, text: "this world can give," },
  { time: 45, text: "a lifetime of joy," },
  { time: 48, text: "in every moment you live. 💖" },
];

const KaraokeSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - currentTime * 1000;
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setCurrentTime(elapsed);

        // Find active lyric
        let idx = -1;
        for (let i = lyrics.length - 1; i >= 0; i--) {
          if (elapsed >= lyrics[i].time) {
            idx = i;
            break;
          }
        }
        setActiveIndex(idx);

        // End at last lyric + 5s
        if (elapsed > lyrics[lyrics.length - 1].time + 5) {
          setIsPlaying(false);
          setCurrentTime(0);
          setActiveIndex(-1);
          clearInterval(timerRef.current);
        }
      }, 50);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(timerRef.current);
    } else {
      setCurrentTime(0);
      setActiveIndex(-1);
      setIsPlaying(true);
    }
  };

  return (
    <section className="karaoke-section section" ref={sectionRef} id="karaoke">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        A Poem For You
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Watch the words come alive ✨
      </motion.p>

      <motion.div
        className="karaoke-container"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="karaoke-card glass-card">
          <div className="karaoke-lyrics">
            {lyrics.map((line, i) => (
              <div
                key={i}
                className={`karaoke-line ${
                  i === activeIndex ? 'active' :
                  i < activeIndex ? 'past' : 'future'
                } ${line.text === '' ? 'empty' : ''}`}
              >
                {line.text || '\u00A0'}
              </div>
            ))}
          </div>

          <motion.button
            className="btn-primary karaoke-play-btn"
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <>
                <span>⏸️</span>
                <span>Pause</span>
              </>
            ) : (
              <>
                <span>▶️</span>
                <span>Play Poem</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default KaraokeSection;
