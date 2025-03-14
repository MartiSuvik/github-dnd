'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import ScrollArrow from '../ui/ScrollArrow';

const SustainabilityHero: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !inView) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split the title into individual letters for staggered animation
    const titleLetters = titleRef.current?.querySelectorAll('span');
    if (titleLetters) {
      gsap.set(titleLetters, {
        opacity: 0,
        rotateX: -90,
        transformOrigin: 'top center',
      });

      tl.fromTo(
        imageRef.current,
        { scale: 1.1, filter: 'brightness(0)' },
        { scale: 1, filter: 'brightness(1)', duration: 2.4, ease: 'power2.inOut' }
      )
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.8 },
          '-=2'
        )
        .to(
          titleLetters,
          {
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
          },
          '-=1'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30, filter: 'blur(5px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 },
          '-=1.4'
        )
        .fromTo(
          arrowRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.inOut' },
          '-=0.5'
        );

      // Continuous arrow bounce animation
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    return () => {
      tl.kill();
    };
  }, [inView]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('sustainability-highlights');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="sustainability-hero"
      className="relative h-screen overflow-hidden perspective-1000"
      aria-label="Sustainability Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dnddesigncenter/image/upload/sustainability_1_yo0sh6.avif"
          alt="Sustainable Forest"
          className="w-full h-full object-cover transform-gpu scale-105"
          loading="eager" // Load this image immediately
          data-fetchpriority="high" // Signal high priority to browser
        />
        {/* Dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"
        />
      </div>

      {/* Text content */}
      <div className="flex min-h-svh items-center justify-center">
        <div className="container text-center mx-auto relative z-10 px-4">
          <div className="grid grid-cols-1 items-start gap-6 py-16 md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div className="mx-auto">
              {/* Title with letter-by-letter animation */}
              <h1
                ref={titleRef}
                className="mb-5 text-6xl sm:text-7xl md:text-8xl lg:text-10xl font-serif uppercase flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-white/90 transform-gpu"
                style={{ perspective: '800px' }}
              >
                {"OUR IMPACT JOURNEY".split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="flex justify-center">
                    {word.split('').map((letter, index) => (
                      <span
                        key={`${wordIndex}-${index}`}
                        className="inline-block transform-gpu"
                        style={{
                          display: 'inline-block',
                          perspective: '800px',
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light"
                style={{ willChange: 'transform, opacity, filter' }}
              >
                The path to reduce the environmental footprint
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        onClick={scrollToNext}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <ScrollArrow 
          targetId="sustainability-highlights" 
          className="w-10 h-10 sm:w-12 sm:h-12 text-white hover:text-green-300 transition-colors duration-300" 
        />
      </div>

      {/* Inline styles for perspective and GPU transforms */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </section>
  );
};

export default SustainabilityHero;