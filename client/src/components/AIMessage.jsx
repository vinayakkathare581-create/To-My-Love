import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Loader } from 'lucide-react';

const AIMessage = () => {
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [displayedText, setDisplayedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const generateMessage = async () => {
    setIsGenerating(true);
    setDisplayedText('');
    setTypingIndex(0);
    setAudioUrl('');
    try {
      const res = await fetch('http://localhost:3001/api/ai-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Sister' })
      });
      const data = await res.json();
      setMessage(data.message);
      
      const ttsRes = await fetch('http://localhost:3001/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.message })
      });
      if (ttsRes.ok) {
        const ttsData = await ttsRes.json();
        setAudioUrl(ttsData.audio);
      }
    } catch (err) {
      console.error('Error generating AI message:', err);
      setMessage("To the most elegant soul... Happy Birthday. (Fallback message)");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (message && typingIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + message.charAt(typingIndex));
        setTypingIndex(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timer);
    }
  }, [message, typingIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section style={{ padding: '4rem 2rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '4rem 3rem', maxWidth: '800px', width: '100%', position: 'relative', border: '1px solid rgba(212,175,55,0.2)' }}>
        
        {!message && !isGenerating && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem', color: 'var(--accent)' }}>
              A Final Word
            </h2>
            <button 
              onClick={generateMessage}
              className="shimmer-btn"
              style={{
                padding: '16px 40px', borderRadius: '2px',
                background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)',
                fontWeight: 400, cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.target.style.background = 'var(--accent-glow)'; e.target.style.color = '#fff'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)'; }}
            >
              Reveal
            </button>
          </div>
        )}

        {isGenerating && (
          <div style={{ textAlign: 'center', color: 'var(--accent)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Loader size={32} />
            </motion.div>
            <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Gathering thoughts...</p>
          </div>
        )}

        {message && (
          <div>
            <div style={{ 
              fontSize: '1.2rem', lineHeight: 2, color: 'var(--text-main)', 
              fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
              minHeight: '150px', fontWeight: 300
            }}>
              {displayedText}
              <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>|</span>
            </div>

            {audioUrl && (
              <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '2rem' }}>
                <button 
                  onClick={togglePlay}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'transparent', border: '1px solid var(--accent)',
                    color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
                </button>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {isPlaying ? 'Listening...' : 'Listen to message'}
                </div>
                <audio 
                  ref={audioRef} 
                  src={audioUrl} 
                  onEnded={() => setIsPlaying(false)}
                  style={{ display: 'none' }} 
                />
              </div>
            )}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes blink { 50% { opacity: 0; } }
            `}} />
          </div>
        )}
      </div>
    </section>
  );
};

export default AIMessage;
