import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './VoiceMessage.css';

const VoiceMessage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Please allow microphone access to record a voice message.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const deleteRecording = () => {
    if (audioURL) URL.revokeObjectURL(audioURL);
    setAudioURL(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section className="voice-section section" ref={sectionRef} id="voice">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Record A Voice Message
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Say something from the heart 🎤
      </motion.p>

      <motion.div
        className="voice-container"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="voice-recorder glass-card">
          {/* Visualizer */}
          <div className={`voice-visualizer ${isRecording ? 'recording' : ''}`}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="visualizer-bar"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: isRecording ? `${20 + Math.random() * 60}%` : '20%',
                }}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="voice-timer">
            {isRecording && <div className="recording-dot" />}
            <span>{formatTime(recordingTime)}</span>
          </div>

          {/* Controls */}
          <div className="voice-controls">
            {!isRecording ? (
              <motion.button
                className="btn-primary voice-btn record-btn"
                onClick={startRecording}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="btn-icon">🎙️</span>
                <span>Start Recording</span>
              </motion.button>
            ) : (
              <motion.button
                className="btn-primary voice-btn stop-btn"
                onClick={stopRecording}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                <span className="btn-icon">⏹️</span>
                <span>Stop Recording</span>
              </motion.button>
            )}
          </div>

          {/* Playback */}
          {audioURL && (
            <motion.div
              className="voice-playback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="playback-label">Your Voice Message 💝</div>
              <audio controls src={audioURL} className="voice-audio" />
              <button className="btn-glass voice-delete" onClick={deleteRecording}>
                🗑️ Delete & Re-record
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default VoiceMessage;
