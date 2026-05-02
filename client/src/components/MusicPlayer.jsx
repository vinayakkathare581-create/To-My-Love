import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = ({ isPlaying, onToggle }) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay bypass

  // Unmute once playback starts via user interaction
  React.useEffect(() => {
    if (isPlaying) {
      setIsMuted(false);
    }
  }, [isPlaying]);

  const musicUrl = "/music/background.mp3"; 

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      <div style={{ display: 'none' }}>
        <ReactPlayer
          url={musicUrl}
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          loop={true}
          width="0"
          height="0"
        />
      </div>

      <motion.div 
        className="glass-panel"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          padding: '0.8rem',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        <button
          onClick={onToggle}
          style={{
            background: isPlaying ? 'var(--accent)' : 'transparent',
            border: '1px solid var(--accent)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isPlaying ? '#000' : 'var(--accent)',
            transition: 'all 0.3s ease'
          }}
        >
          <Music size={18} />
        </button>

        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '120px', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', overflow: 'hidden' }}
            >
              <button 
                onClick={() => setIsMuted(!isMuted)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  width: '60px',
                  accentColor: 'var(--accent)',
                  cursor: 'pointer'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;
