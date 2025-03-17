"use client";

import React, { useEffect, useRef } from "react";
import { BiCalendar, BiPhone, BiMap } from "react-icons/bi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

export const ProductCollectionCTA: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(itemRefs.current, { opacity: 0, y: 20 });
      gsap.set(iconRefs.current, { scale: 0.8, opacity: 0 });

      gsap.to(iconRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1.2)",
      });

      gsap.to(itemRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.15,
        delay: 0.2,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [inView]);

  const triggerFooterContact = () => {
    console.log('Button clicked'); // Debug log
    const footerElement = document.querySelector('#footer');
    console.log('Footer element:', footerElement); // Debug log
    
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth',
      });
  
      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]');
        console.log('Footer contact button:', footerContactBtn); // Debug log
        if (footerContactBtn instanceof HTMLButtonElement) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <section
      ref={ref}
      id="luxury-consultation"
      className="px-4 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50"
      aria-label="Luxury Design Consultation"
    >
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8 text-gray-900">
          Transform Your Space with Bespoke Luxury
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 md:mb-12">
          Experience tailored interior solutions from our expert designers. Schedule a consultation or visit our showroom to explore exquisite collections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Schedule Consultation */}
          <div
            ref={(el) => (itemRefs.current[0] = el)}
            className="group relative p-6 md:p-8 rounded-2xl bg-white shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <div ref={(el) => (iconRefs.current[0] = el)} className="mb-4 lg:mb-6 flex justify-center">
              <BiCalendar className="size-12 text-[#C5A267] transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-2 text-xl font-medium md:text-2xl text-gray-900">
              Schedule a Consultation
            </h3>
            <p className="text-gray-600 mb-4">
              Work one-on-one with our designers to create a bespoke space tailored to your vision.
            </p>
            <a
              href="mailto:info@dnddesigncenter.com"
              className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300 min-h-[44px] flex items-center justify-center w-full"
              onClick={triggerFooterContact}
            >
              Book Now
            </a>
          </div>

          {/* Speak with a Design Expert */}
          <div
            ref={(el) => (itemRefs.current[1] = el)}
            className="group relative p-6 md:p-8 rounded-2xl bg-white shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <div ref={(el) => (iconRefs.current[1] = el)} className="mb-4 lg:mb-6 flex justify-center">
              <BiPhone className="size-12 text-[#C5A267] transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-2 text-xl font-medium md:text-2xl text-gray-900">
              Speak with a Design Expert
            </h3>
            <p className="text-gray-600 mb-4">
              Have questions? Our experts are ready to help with personalized guidance.
            </p>
            <a
              className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300 min-h-[44px] flex items-center justify-center w-full"
              onClick={triggerFooterContact}
            >
              Call Now
            </a>
          </div>

          {/* Visit Our Showroom */}
          <div
            ref={(el) => (itemRefs.current[2] = el)}
            className="group relative p-6 md:p-8 rounded-2xl bg-white shadow-md transition-all duration-200 hover:shadow-lg sm:col-span-2 lg:col-span-1"
          >
            <div ref={(el) => (iconRefs.current[2] = el)} className="mb-4 lg:mb-6 flex justify-center">
              <BiMap className="size-12 text-[#C5A267] transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="mb-2 text-xl font-medium md:text-2xl text-gray-900">
              Visit Our Showroom
            </h3>
            <p className="text-gray-600 mb-4">
              Discover our collections in person and explore exclusive luxury designs.
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#C5A267] hover:text-[#B49157] transition-colors duration-300 min-h-[44px] flex items-center justify-center w-full"
              onClick={triggerFooterContact}
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-12">
          <a
            className="inline-flex items-center gap-2 px-6 py-4 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 min-h-[44px]"
            onClick={triggerFooterContact}
          >
            REQUEST A CONSULTATION
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCollectionCTA;
