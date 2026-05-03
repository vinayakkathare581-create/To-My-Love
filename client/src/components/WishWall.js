import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './WishWall.css';

const EMOJI_LIST = ['💖', '🎂', '🌟', '🎉', '🦋', '🌸', '💝', '✨', '🎀', '🌺', '💫', '🎁', '🥳', '💜', '🌈'];

const WishWall = () => {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch('/wishes');
      const data = await res.json();
      setWishes(data.wishes || []);
    } catch (err) {
      console.log('Could not fetch wishes');
    }
  }, []);

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 15000);
    return () => clearInterval(interval);
  }, [fetchWishes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), emoji: selectedEmoji }),
      });
      const data = await res.json();
      if (data.success) {
        setWishes(prev => [data.wish, ...prev]);
        setName('');
        setMessage('');
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting wish:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="wish-section section" ref={sectionRef} id="wishwall">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Birthday Wish Wall
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Leave your heartfelt wishes here 💌
      </motion.p>

      <div className="wish-layout">
        {/* Form */}
        <motion.form
          className="wish-form glass-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="wish-form-title">Write Your Wish</h3>
          
          <div className="wish-input-group">
            <label htmlFor="wish-name">Your Name</label>
            <input
              id="wish-name"
              type="text"
              className="input-glass"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
          </div>

          <div className="wish-input-group">
            <label htmlFor="wish-message">Your Wish</label>
            <textarea
              id="wish-message"
              className="input-glass wish-textarea"
              placeholder="Write your birthday wish..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={300}
              rows={4}
            />
          </div>

          <div className="wish-emoji-section">
            <label>Choose an Emoji</label>
            <div className="emoji-selector">
              <button
                type="button"
                className="emoji-selected"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {selectedEmoji}
              </button>
              
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    className="emoji-picker"
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  >
                    {EMOJI_LIST.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        className={`emoji-option ${selectedEmoji === emoji ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedEmoji(emoji);
                          setShowEmojiPicker(false);
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary wish-submit"
            disabled={!name.trim() || !message.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : submitSuccess ? (
              <span>✨ Wish Sent!</span>
            ) : (
              <>
                <span>Send Wish</span>
                <span>💝</span>
              </>
            )}
          </button>
        </motion.form>

        {/* Wishes Display */}
        <motion.div
          className="wish-cards-container"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {wishes.length === 0 ? (
            <div className="wish-empty glass-card">
              <span className="wish-empty-emoji">💌</span>
              <p>No wishes yet. Be the first to leave one!</p>
            </div>
          ) : (
            <div className="wish-cards-grid">
              <AnimatePresence>
                {wishes.slice(0, 12).map((wish, i) => (
                  <motion.div
                    key={wish.id}
                    className="wish-card glass-card"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="wish-card-header">
                      <span className="wish-card-emoji">{wish.emoji}</span>
                      <span className="wish-card-name">{wish.name}</span>
                    </div>
                    <p className="wish-card-message">{wish.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WishWall;
