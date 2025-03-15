'use client';

import React, { useEffect, useRef } from 'react';
import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

export const ProductCollectionInfo: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(itemRefs.current, {
        opacity: 0,
        y: 20
      });
      
      gsap.set(iconRefs.current, {
        scale: 0.8,
        opacity: 0
      });

      // Mobile-friendly animations (simpler and faster)
      // Animate icons first
      gsap.to(iconRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.2)',
      });

      // Then animate content with slight delay
      gsap.to(itemRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.15,
        delay: 0.2,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, [inView]);

  return (
    <section 
      ref={ref}
      id="contact-info" 
      className="px-4 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50"
      aria-label="Contact Information"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Card */}
          <div 
            ref={el => itemRefs.current[0] = el}
            className="group relative p-6 md:p-8 rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-sm"
          >
            <div 
              ref={el => iconRefs.current[0] = el}
              className="mb-4 lg:mb-6 relative"
            >
              <div className="absolute inset-0 blur-xl transform group-hover:scale-110 transition-transform duration-200" />
              <BiEnvelope className="size-12 text-[#C5A267] relative z-10 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-2 text-xl font-medium leading-tight md:text-2xl lg:mb-3 text-gray-900">
              Contact
            </h3>
            <p className="mb-4 md:mb-5 text-gray-600">We'd love to hear your ideas.</p>
            <a 
              href="mailto:info@dnddesigncenter.com"
              className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center"
            >
              info@dnddesigncenter.com
            </a>
          </div>

          {/* Phone Card */}
          <div 
            ref={el => itemRefs.current[1] = el}
            className="group relative p-6 md:p-8 rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-sm"
          >
            <div 
              ref={el => iconRefs.current[1] = el}
              className="mb-4 lg:mb-6 relative"
            >
              <div className="absolute inset-0 blur-xl transform group-hover:scale-110 transition-transform duration-200" />
              <BiPhone className="size-12 text-[#C5A267] relative z-10 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-2 text-xl font-medium leading-tight md:text-2xl lg:mb-3 text-gray-900">
              Phone
            </h3>
            <p className="mb-4 md:mb-5 text-gray-600">
              Call us for inquiries for instant service.
            </p>
            <a 
              href="tel:+17189347100" 
              className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center"
            >
              +1 (718) 934-7100
            </a>
          </div>

          {/* Office Card */}
          <div 
            ref={el => itemRefs.current[2] = el}
            className="group relative p-6 md:p-8 rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-sm sm:col-span-2 lg:col-span-1"
          >
            <div 
              ref={el => iconRefs.current[2] = el}
              className="mb-4 lg:mb-6 relative"
            >
              <div className="absolute inset-0 blur-xl transform group-hover:scale-110 transition-transform duration-200" />
              <BiMap className="size-12 text-[#C5A267] relative z-10 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-2 text-xl font-medium leading-tight md:text-2xl lg:mb-3 text-gray-900">
              Office
            </h3>
            <p className="mb-4 md:mb-5 text-gray-600">
              See our latest designs and collections on spot.
            </p>
            <a 
              href="https://maps.app.goo.gl/wKZFk4P4ry4Hcr7LA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300 min-h-[44px] flex items-center"
            >
              2615 East 17th Street Brooklyn, New York 11235, USA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollectionInfo;