import React, { useEffect, useRef, useCallback } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const shootingStarsRef = useRef([]);
  const floatingHeartsRef = useRef([]);

  const createParticles = useCallback((canvas) => {
    const particles = [];
    const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.6 ? 340 + Math.random() * 25 : 
             Math.random() > 0.3 ? 270 + Math.random() * 35 : 
             40 + Math.random() * 15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        trail: [],
        maxTrail: Math.floor(Math.random() * 4) + 2,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas);
    };
    
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Subtle radial gradient overlay
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.4;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.6);
      grad.addColorStop(0, 'rgba(244, 63, 94, 0.015)');
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.008)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Spawn shooting stars randomly
      if (Math.random() < 0.01) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 10,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // ~45 degrees
          opacity: 1
        });
      }
      
      // Spawn floating hearts randomly
      if (Math.random() < 0.02) {
        floatingHeartsRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          size: Math.random() * 8 + 4,
          speedY: Math.random() * 1 + 0.5,
          swaySpeed: Math.random() * 0.05 + 0.02,
          swayAmount: Math.random() * 30 + 10,
          angle: 0,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() > 0.5 ? 340 : 330 // Pink/Red hues
        });
      }
      
      particlesRef.current.forEach((p, i) => {
        p.pulse += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulse) * 0.35 + 0.65;
        
        // Mouse interaction — attract gently
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 1) {
          const force = (200 - dist) / 200;
          p.x += dx * force * 0.005;
          p.y += dy * force * 0.005;
        }
        
        // Store trail position
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) p.trail.pop();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        
        // Draw trail
        p.trail.forEach((tp, ti) => {
          const trailOpacity = p.opacity * pulseFactor * (1 - ti / p.maxTrail) * 0.3;
          const trailSize = p.size * pulseFactor * (1 - ti / p.maxTrail) * 0.5;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${trailOpacity})`;
          ctx.fill();
        });
        
        // Draw main particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity * pulseFactor})`;
        ctx.fill();
        
        // Draw soft glow
        const glowSize = p.size * pulseFactor * 4;
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        glowGrad.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.opacity * pulseFactor * 0.15})`);
        glowGrad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
        
        // Connect nearby particles with gradient lines
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 130) {
            const lineOpacity = (1 - d / 130) * 0.06;
            const lineGrad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            lineGrad.addColorStop(0, `hsla(${p.hue}, 60%, 50%, ${lineOpacity})`);
            lineGrad.addColorStop(1, `hsla(${p2.hue}, 60%, 50%, ${lineOpacity})`);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });
      
      // Animate and draw shooting stars
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const star = shootingStarsRef.current[i];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;
        
        if (star.opacity <= 0 || star.y > canvas.height || star.x > canvas.width) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }
        
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;
        
        const grad = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Animate and draw floating hearts
      for (let i = floatingHeartsRef.current.length - 1; i >= 0; i--) {
        const heart = floatingHeartsRef.current[i];
        heart.y -= heart.speedY;
        heart.angle += heart.swaySpeed;
        const currentX = heart.x + Math.sin(heart.angle) * heart.swayAmount;
        heart.opacity -= 0.001; // Fade out slowly
        
        if (heart.y < -20 || heart.opacity <= 0) {
          floatingHeartsRef.current.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.translate(currentX, heart.y);
        const scale = heart.size / 10;
        ctx.scale(scale, scale);
        
        ctx.beginPath();
        // Heart shape using bezier curves
        ctx.moveTo(0, 3);
        ctx.bezierCurveTo(0, -2, -5, -5, -8, -2);
        ctx.bezierCurveTo(-11, 2, -6, 7, 0, 12);
        ctx.bezierCurveTo(6, 7, 11, 2, 8, -2);
        ctx.bezierCurveTo(5, -5, 0, -2, 0, 3);
        
        ctx.fillStyle = `hsla(${heart.hue}, 80%, 65%, ${heart.opacity})`;
        ctx.fill();
        ctx.restore();
      }
      
      animFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
