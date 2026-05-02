import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { motion } from 'framer-motion';

const memories = [
  { id: 1, caption: "A beautiful start to our journey.", img: "/images/memories/memory1.jpg" },
  { id: 2, caption: "Cherishing every moment with you.", img: "/images/memories/memory2.jpg" },
  { id: 3, caption: "Your smile makes everything better.", img: "/images/memories/memory3.jpg" },
  { id: 4, caption: "Together is my favorite place to be.", img: "/images/memories/memory4.jpg" },
  { id: 5, caption: "Every day with you is a gift.", img: "/images/memories/memory5.jpg" },
  { id: 6, caption: "To more laughs and more love.", img: "/images/memories/memory6.jpg" },
  { id: 7, caption: "The best memories are the ones we share.", img: "/images/memories/memory7.jpg" },
  { id: 8, caption: "You are my sunshine on a rainy day.", img: "/images/memories/memory8.jpg" },
  { id: 9, caption: "To many more memories together.", img: "/images/memories/memory9.jpg" }
];

const MemorySlideshow = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cursive"
        style={{ fontSize: '4rem', marginBottom: '4rem', textAlign: 'center', color: 'var(--text-main)', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
      >
        Treasured <span style={{ color: 'var(--accent)' }}>Memories</span>
      </motion.h2>

      <div style={{ width: '100%', maxWidth: '350px' }}>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="mySwiper"
          style={{ width: '320px', height: '450px' }}
        >
          {memories.map((memory) => (
            <SwiperSlide key={memory.id} style={{
              borderRadius: '2px',
              backgroundColor: '#fff', // White border like polaroid
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              padding: '12px 12px 60px 12px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={memory.img} 
                  alt="Memory" 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(20%)' }}
                />
              </div>
              <div style={{ 
                position: 'absolute', bottom: '20px', left: 0, right: 0, 
                textAlign: 'center', padding: '0 10px'
              }}>
                <p style={{ 
                  fontSize: '1rem', fontFamily: "'Great Vibes', cursive", 
                  color: '#333', margin: 0
                }}>
                  {memory.caption}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MemorySlideshow;
