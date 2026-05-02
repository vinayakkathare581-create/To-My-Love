import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Feather } from 'lucide-react';

const icons = [
  { id: 'heart', component: <Heart size={24} strokeWidth={1} /> },
  { id: 'star', component: <Star size={24} strokeWidth={1} /> },
  { id: 'feather', component: <Feather size={24} strokeWidth={1} /> }
];

const WishWall = () => {
  const [wishes, setWishes] = useState([]);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('heart');

  useEffect(() => {
    fetch('http://localhost:3001/api/wishes')
      .then(res => res.json())
      .then(data => setWishes(data))
      .catch(err => console.error('Error fetching wishes:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/api/wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, text, emoji: selectedIcon })
      });
      
      if (response.ok) {
        const newWish = await response.json();
        setWishes([...wishes, newWish]);
        setText('');
        setAuthor('');
      }
    } catch (err) {
      console.error('Error saving wish:', err);
    }
  };

  const renderIcon = (iconId) => {
    const icon = icons.find(i => i.id === iconId) || icons[0];
    return <span style={{ color: 'var(--accent)' }}>{icon.component}</span>;
  };

  return (
    <section style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 className="cursive" style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '4rem', color: 'var(--text-main)', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
        Notes of <span style={{ color: 'var(--accent)' }}>Love</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        <AnimatePresence>
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '2px solid rgba(212,175,55,0.3)' }}
            >
              <div>{renderIcon(wish.emoji)}</div>
              <p style={{ color: 'var(--text-main)', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>"{wish.text}"</p>
              <p style={{ color: 'var(--accent)', fontSize: '0.9rem', textAlign: 'right', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                — {wish.author || 'Forever'}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


    </section>
  );
};

export default WishWall;
