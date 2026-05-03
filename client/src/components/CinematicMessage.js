import React, { useEffect, useRef, useState } from 'react';
import './CinematicMessage.css';

const lines = [
  "Your hugs are my strength 💖",
  "When you hold my hand, I feel like the whole world is with me 🌍",
  "You are my everything ✨"
];

const CinematicMessage = () => {
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous content
    container.innerHTML = '';

    let wordIndex = 0;
    const words = [];

    // Split text into words and create spans
    lines.forEach((line, lineIndex) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'cinematic-line';
      
      const lineWords = line.split(' ');
      
      lineWords.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.className = 'cinematic-word';
        lineDiv.appendChild(span);
        words.push(span);
      });

      container.appendChild(lineDiv);
    });

    // Animation logic
    const animateWords = () => {
      if (wordIndex < words.length) {
        // Dim the previous word
        if (wordIndex > 0) {
          words[wordIndex - 1].classList.remove('word-active');
        }

        // Activate the current word
        const currentWord = words[wordIndex];
        currentWord.classList.add('word-visible', 'word-active');
        
        wordIndex++;
        
        // Dynamic delay based on word length/punctuation for natural pacing
        let delay = 250;
        if (currentWord.textContent.includes(',')) delay = 400;
        else if (currentWord.textContent.includes('💖') || currentWord.textContent.includes('🌍') || currentWord.textContent.includes('✨')) delay = 600;
        
        setTimeout(animateWords, delay);
      } else {
        // Animation finished
        if (words.length > 0) {
          words[words.length - 1].classList.remove('word-active');
        }
        setIsRevealed(true);
      }
    };

    // Start animation with a slight delay
    setTimeout(animateWords, 1000);

    return () => {
      setIsRevealed(false);
    };
  }, [lines]);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      const giftSection = document.getElementById('gift');
      if (giftSection) {
        giftSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // Wait for fade out
  };

  if (!isVisible) return null;

  return (
    <section className="cinematic-message-section" id="cinematic-message">
      <div className="cinematic-content">
        <div className="cinematic-text-container" ref={containerRef}>
          {/* Words will be injected here by JS */}
        </div>
        
        <div className={`cinematic-button-wrapper ${isRevealed ? 'visible' : ''}`}>
          <button className="cinematic-continue-btn" onClick={handleContinue}>
            Continue ➝
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinematicMessage;
