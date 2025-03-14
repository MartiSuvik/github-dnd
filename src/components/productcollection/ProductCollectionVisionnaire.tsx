'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@relume_io/relume-ui';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

// AnimatedHeader component with its own fromTo animation.
const AnimatedHeader: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Skip animations if not in view or prefers reduced motion
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        // Simplified for mobile - less complex animation
        const textParts = ['Recognized by ', 'VISIONNAIRE'];
        const wrappedText = textParts
          .map((part, index) => {
            if (index === 1) {
              // Keep Visionnaire as a single unit with its gradient
              return `<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">${part}</span>`;
            }
            return part;
          })
          .join('');

        titleRef.current.innerHTML = wrappedText;

        const visionnaireElement = titleRef.current.querySelector('.text-transparent');

        // Simpler animation for mobile
        gsap.fromTo(
          titleRef.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8 }
        );

        gsap.fromTo(
          visionnaireElement,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.2 }
        );

        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
        );
      }
    });

    return () => ctx.revert();
  }, [inView]);

  return (
    <div ref={ref} className="mb-8">
      <h1
        ref={titleRef}
        className="mb-5 text-3xl sm:text-4xl font-bold md:mb-6 md:text-5xl lg:text-7xl perspective-1000"
        style={{ perspective: '1000px' }}
      >
        RECOGNIZED BY{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
          Visionnaire
        </span>{' '}
        for Elevated Style
      </h1>
    </div>
  );
};

const ProductCollectionVisionnaire: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const otherTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // Simulate loading for mobile
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300); // shorter load time for mobile
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Simpler animations for mobile
  useEffect(() => {
    if (!inView || loading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (otherTextRef.current) {
        gsap.fromTo(
          otherTextRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }
        );
      }

      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
          }
        );
      }
    });
    return () => ctx.revert();
  }, [inView, loading]);

  return (
    <section 
      ref={ref}
      className="px-[5%] py-12 md:py-12 lg:py-14 bg-gray-100"
      aria-label="Visionnaire Partnership"
    >
      <div className="container mx-auto max-w-7xl">
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c9a671]"></div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 gap-y-8 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            {/* Text Column */}
            <div>
              <AnimatedHeader />
              <div ref={otherTextRef}>
                <p className="mb-6 md:mb-8 text-gray-700">
                  Our commitment to unparalleled craftsmanship, refined aesthetics, and
                  enduring quality has earned us the admiration of Visionnaire—where only
                  the most distinguished names in home décor are featured.
                </p>
                <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                  <div>
                    <h6 className="mb-2 text-base font-bold leading-tight md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
                      Quality Assurance
                    </h6>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Premium materials and meticulous detailing ensure longevity.
                    </p>
                  </div>
                  <div>
                    <h6 className="mb-2 text-base font-bold leading-tight md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
                      Personalized Service
                    </h6>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Tailored solutions that reflect your unique style and preferences.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <Link to="/collaboration" className="w-full sm:w-auto">
                    <Button
                      title="Learn More"
                      className="w-full sm:w-auto min-h-[44px] bg-gradient-to-r from-[#b49157] to-[#c9a671] text-white border-none hover:from-[#c9a671] hover:to-[#b49157]"
                    >
                      Learn More From Visionnaire
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Video Column - optimized for mobile */}
            <div ref={videoRef}>
              <div className="relative aspect-w-16 aspect-h-9 overflow-hidden shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://res.cloudinary.com/dnddesigncenter/image/upload/f_auto/v1740566639/qtc6byie8s2vb0jgzrna.jpg"

                  preload="metadata"
                >
                  <source
  src="https://res.cloudinary.com/dnddesigncenter/video/upload/f_auto,q_auto:good/luxury-design-catalogue.mp4"
  type="video/mp4"
/>

                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCollectionVisionnaire;