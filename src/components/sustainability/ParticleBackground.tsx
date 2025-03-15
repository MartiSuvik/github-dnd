import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  containerId: string;
  className?: string;
}

const colors = ['#7FB069', '#B4D6B0', '#4B7F52'];

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ containerId, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    // Reduce particle count for mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 75;
    
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 2 + Math.random() * 3, // Smaller particles for better performance (2-5px radius)
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.6, // Slower movement (-0.3 to 0.3)
        vy: (Math.random() - 0.5) * 0.6, // Slower movement (-0.3 to 0.3)
        opacity: 0.4 + Math.random() * 0.2 // 0.4-0.6 opacity
      });
    }
    return particles;
  };

  // Update particle positions
  const updateParticles = (width: number, height: number) => {
    particlesRef.current.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap particles around the edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
    });
  };

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    particlesRef.current.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color}${Math.round(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
    });
  };

  // Animation loop - optimized with fewer calculations
  const animate = () => {
    if (isReducedMotion) return; // Skip animation for reduced motion
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (canvas && ctx) {
      updateParticles(canvas.width, canvas.height);
      drawParticles(ctx);
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle resize - throttled
  useEffect(() => {
    if (isReducedMotion) return; // Skip for reduced motion
    
    let resizeTimeout: number;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (canvasRef.current && containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          canvasRef.current.width = width;
          canvasRef.current.height = height;
          particlesRef.current = initParticles(width, height);
        }
      }, 200); // 200ms throttle
    };
    
    handleResize(); // Initial setup
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion]);

  // Setup and cleanup animation
  useEffect(() => {
    if (isReducedMotion) return; // Skip for reduced motion
    
    if (canvasRef.current && containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      particlesRef.current = initParticles(width, height);
      animate();
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReducedMotion]);

  return (
    <div
      id={containerId}
      ref={containerRef}
      className={`absolute inset-0 -z-1 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {!isReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50" />
    </div>
  );
};

export default ParticleBackground;