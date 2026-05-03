import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './MemorySection.css';

const memories = [
  {
    id: 1,
    image: '/photos/photo.jpg',
    title: 'Our First Adventure',
    caption: 'ನಮ್ಮ ಮೊದಲ ಸಾಹಸ. ನಿನ್ನ ಜೊತೆ ಕಳೆದ ಪ್ರತಿ ಕ್ಷಣವೂ ನನಗೆ ಅಮೂಲ್ಯವಾದದ್ದು.',
    date: 'Beautiful Soul',
  },
  {
    id: 2,
    image: '/photos/photo1.jpg',
    title: 'Celebration Nights',
    caption: 'ನಮ್ಮ ಸುಂದರ ನೆನಪುಗಳು. ನಿನ್ನ ಮುಖದ ಮೇಲಿನ ನಗು ಯಾವಾಗಲೂ ಹೀಗೆಯೇ ಇರಲಿ.',
    date: 'Unforgettable',
  },
  {
    id: 3,
    image: '/photos/photo2.jpg',
    title: 'Sunny Days Together',
    caption: 'ಬೆಳದಿಂಗಳ ರಾತ್ರಿಗಳು. ನಿನ್ನ ಜೊತೆಗಿನ ಮಾತುಗಳು ನನ್ನ ಮನಸ್ಸಿಗೆ ಶಾಂತಿ ಕೊಡುತ್ತವೆ.',
    date: 'Golden Memories',
  },
  {
    id: 4,
    image: '/photos/photo3.jpg',
    title: 'Late Night Talks',
    caption: 'ಒಟ್ಟಿಗೆ ಕಳೆದ ಮಧುರ ಕ್ಷಣಗಳು. ನೀನು ನನ್ನ ಜೀವನದ ಅತ್ಯಮೂಲ್ಯ ಉಡುಗೊರೆ ತಂಗಿ.',
    date: 'Precious Moments',
  },
  {
    id: 5,
    image: '/photos/photo4.jpg',
    title: 'Acts of Love',
    caption: 'ನಿನ್ನ ಪ್ರೀತಿ ಮತ್ತು ಕಾಳಜಿ ನನ್ನೆಲ್ಲಾ ನೋವುಗಳನ್ನು ಮರೆಸುತ್ತದೆ. ನೀನು ನನ್ನ ಶಕ್ತಿ.',
    date: 'Forever Grateful',
  },
  {
    id: 6,
    image: '/photos/photo5.jpg',
    title: 'Growing Together',
    caption: 'ಒಟ್ಟಿಗೆ ಬೆಳೆದ ದಿನಗಳು. ನಿನ್ನ ಜೊತೆಗಿನ ಈ ಸುಂದರ ಪಯಣ ಎಂದಿಗೂ ಮುಗಿಯದಿರಲಿ.',
    date: 'Our Journey',
  },
  {
    id: 7,
    image: '/photos/photo6.jpg',
    title: 'Endless Smiles',
    caption: 'ನಿನ್ನ ಮುದ್ದಾದ ನಗು. ಆ ನಗು ನನ್ನ ಪ್ರತಿಯೊಂದು ದಿನವನ್ನು ಬೆಳಗಿಸುತ್ತದೆ.',
    date: 'Joyful Times',
  },
  {
    id: 8,
    image: '/photos/photo7.jpg',
    title: 'Sibling Bond',
    caption: 'ಅಣ್ಣ ತಂಗಿಯ ಬಾಂಧವ್ಯ. ಇದು ಎಂದಿಗೂ ಮುರಿಯದ, ಕೊನೆಯಾಗದ ಶುದ್ಧ ಪ್ರೀತಿಯ ಬಂಧ.',
    date: 'Pure Love',
  },
  {
    id: 9,
    image: '/photos/photo8.jpg',
    title: 'Happy Birthday',
    caption: 'ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು! ನೀನು ಯಾವಾಗಲೂ ಖುಷಿಯಾಗಿರು ನನ್ನ ಮುದ್ದು ತಂಗಿ.',
    date: 'Special Day',
  },
];

const MemorySection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Auto-scroll logic
  useEffect(() => {
    if (!isInView) return;
    
    let intervalId;
    
    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (gridRef.current) {
          const grid = gridRef.current;
          const firstCard = grid.querySelector('.memory-card');
          if (firstCard) {
            const gap = window.innerWidth <= 768 ? 15 : 20;
            const scrollAmount = firstCard.offsetWidth + gap;
            
            if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
              grid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
          }
        }
      }, 2500); // Scroll every 2.5 seconds
    };

    const stopAutoScroll = () => {
      if (intervalId) clearInterval(intervalId);
    };

    startAutoScroll();

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mouseenter', stopAutoScroll);
      grid.addEventListener('mouseleave', startAutoScroll);
      grid.addEventListener('touchstart', stopAutoScroll, { passive: true });
      grid.addEventListener('touchend', startAutoScroll);
    }

    return () => {
      stopAutoScroll();
      if (grid) {
        grid.removeEventListener('mouseenter', stopAutoScroll);
        grid.removeEventListener('mouseleave', startAutoScroll);
        grid.removeEventListener('touchstart', stopAutoScroll);
        grid.removeEventListener('touchend', startAutoScroll);
      }
    };
  }, [isInView]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; // Increased depth
    const rotateY = ((x - centerX) / centerX) * 15; // Increased depth

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateY(-10px)`;
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';

    // Glare effect logic
    const glare = card.querySelector('.card-glare');
    if (glare) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 50%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';

    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.opacity = '0';
      glare.style.transition = 'opacity 0.5s ease';
    }
  };

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.transition = 'opacity 0.1s ease-out';
    }
  };

  return (
    <section className="memory-section" ref={sectionRef} id="memories">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Our Precious Memories
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        A collection of beautiful moments we share 🦋
      </motion.p>

      <div className="memory-grid" ref={gridRef}>
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="memory-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + (index * 0.1), duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            <div className="card-image-wrapper">
              <img src={memory.image} alt={memory.title} className="card-image" />
            </div>
            
            <div className="card-content">
              <span className="card-date">{memory.date}</span>
              <h3 className="card-title">{memory.title}</h3>
              <p className="card-caption kannada-text">{memory.caption}</p>
            </div>
            
            {/* Dynamic Glare Effect */}
            <div className="card-glare-container">
              <div className="card-glare"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemorySection;
