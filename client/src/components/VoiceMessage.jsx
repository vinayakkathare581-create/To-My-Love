import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceMessage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Please allow microphone access to record a message.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

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
    <section style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '4rem 3rem', textAlign: 'center', maxWidth: '500px', width: '100%', border: '1px solid rgba(212,175,55,0.2)' }}>
        <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--accent)' }}>Voice Note</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontWeight: 300, lineHeight: 1.6 }}>
          Leave a message she can listen to anytime.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {!isRecording ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: 'transparent', border: '1px solid var(--accent)',
                color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--accent-glow)';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--accent)';
              }}
            >
              <Mic size={24} />
            </motion.button>
          ) : (
            <motion.button
              animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 0px rgba(212,175,55,0)', '0 0 20px rgba(212,175,55,0.5)', '0 0 0px rgba(212,175,55,0)'] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              onClick={stopRecording}
              style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: 'var(--accent)', border: 'none',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Square size={24} fill="currentColor" />
            </motion.button>
          )}
        </div>

        {audioURL && (
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={togglePlay}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
            </button>
            <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', background: 'var(--accent)', transformOrigin: 'left', scaleX: isPlaying ? 1 : 0, transition: 'transform 10s linear' }} />
            </div>
            <audio 
              ref={audioRef} 
              src={audioURL} 
              onEnded={() => setIsPlaying(false)}
              style={{ display: 'none' }} 
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default VoiceMessage;
