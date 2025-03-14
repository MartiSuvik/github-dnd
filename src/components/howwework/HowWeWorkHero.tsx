import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollArrow from '../ui/ScrollArrow';
import { useInView } from 'react-intersection-observer';

interface HowWeWorkHeroProps {
  scrollToTimeline: () => void;
}

const HowWeWorkHero: React.FC<HowWeWorkHeroProps> = ({ }) => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !inView) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const titleLetters = titleRef.current?.querySelectorAll('span');

    if (titleLetters) {
      gsap.set(titleLetters, {
        opacity: 0,
        rotateX: -90,
        transformOrigin: 'top center',
      });
    }

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
        titleLetters || [],
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

    return () => {
      tl.kill();
    };
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen overflow-hidden perspective-1000"
      aria-label="How We Work Hero Section"
    >
      <div className="absolute inset-0">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center transform scale-[1.1] transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://www.astra.it/img/showroom/living_1_composition.webp')",
          }}
        >
          <div 
            ref={overlayRef} 
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" 
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="mb-5 text-4xl sm:text-6xl md:text-8xl lg:text-9xl transform-gpu uppercase flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-white/90 title-wrap"
            style={{ perspective: '800px' }}
          >
            {"How We Work".split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="flex justify-center space-x-2">
                {word.split('').map((letter, index) => (
                  <span
                    key={`${wordIndex}-${index}`}
                    className="inline-block transform-gpu"
                    style={{ perspective: '800px' }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p
            ref={subtitleRef}
            className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto"
            style={{
              willChange: 'transform, opacity, filter',
            }}
          >
            Our process of transforming spaces through Italian craftsmanship.
          </p>
        </div>
      </div>

      <div
        ref={arrowRef}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-10 transition-transform duration-300 hover:scale-110"
      >
        <ScrollArrow
          targetId="how-we-work"
          className="w-8 h-8 sm:w-12 sm:h-12 text-white hover:text-[#C5A267] transition-colors duration-300"
        />
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .title-wrap {
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 640px) {
          .title-wrap {
            flex-direction: row;
          }
        }
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2.5rem;
            line-height: 1.2;
          }
        }
      `}</style>
    </section>
  );
};

export default HowWeWorkHero;