import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './AIMessage.css';

const AIMessage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState('deeply emotional and poetic');
  const [ttsAudio, setTtsAudio] = useState(null);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const tones = [
    { value: 'deeply emotional and poetic', label: '💝 Poetic', color: '#f43f5e' },
    { value: 'warm and playful', label: '🌟 Playful', color: '#fbbf24' },
    { value: 'elegant and heartfelt', label: '🦋 Elegant', color: '#a855f7' },
    { value: 'nostalgic and tender', label: '🌸 Nostalgic', color: '#ec4899' },
  ];

  const generateMessage = async () => {
    setIsLoading(true);
    setMessage('');
    setTtsAudio(null);
    try {
      const res = await fetch('/ai-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tone }),
      });
      const data = await res.json();
      // Typewriter effect
      const fullMessage = data.message;
      let i = 0;
      const interval = setInterval(() => {
        setMessage(fullMessage.slice(0, i + 1));
        i++;
        if (i >= fullMessage.length) clearInterval(interval);
      }, 30);
    } catch (err) {
      setMessage('You are the most wonderful person in my life. Happy Birthday, my dearest sister! 💖✨');
    } finally {
      setIsLoading(false);
    }
  };

  const generateTTS = async () => {
    if (!message) return;
    setIsTtsLoading(true);
    try {
      const res = await fetch('/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setTtsAudio(url);
      }
    } catch (err) {
      console.error('TTS error:', err);
    } finally {
      setIsTtsLoading(false);
    }
  };

  return (
    <section className="ai-section section" ref={sectionRef} id="ai-message">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        AI Birthday Message
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Let AI craft a unique message for your special person 🤖💖
      </motion.p>

      <motion.div
        className="ai-container"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="ai-card glass-card">
          {/* Tone selector */}
          <div className="ai-tone-selector">
            <label>Choose a tone:</label>
            <div className="ai-tones">
              {tones.map(t => (
                <button
                  key={t.value}
                  className={`ai-tone-btn ${tone === t.value ? 'active' : ''}`}
                  onClick={() => setTone(t.value)}
                  style={{ '--tone-color': t.color }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <motion.button
            className="btn-primary ai-generate-btn"
            onClick={generateMessage}
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? (
              <>
                <span className="ai-spinner" />
                <span>Crafting magic...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Generate Message</span>
              </>
            )}
          </motion.button>

          {/* Message display */}
          {message && (
            <motion.div
              className="ai-message-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="ai-message-icon">💌</div>
              <p className="ai-message-text">{message}</p>
              
              {/* TTS button */}
              <div className="ai-tts-section">
                <motion.button
                  className="btn-glass ai-tts-btn"
                  onClick={generateTTS}
                  disabled={isTtsLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isTtsLoading ? (
                    <span>🔄 Generating voice...</span>
                  ) : (
                    <span>🔊 Listen to this message</span>
                  )}
                </motion.button>
                
                {ttsAudio && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ai-tts-player"
                  >
                    <audio controls src={ttsAudio} className="ai-audio" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AIMessage;
