import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

interface CallToActionProps {
  triggerFooterContact: () => void;
}

const HowWeWorkCallToAction: React.FC<CallToActionProps> = ({}) => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (
      !inView ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    // Animate the headline
    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Animate the buttons with a slight delay and stagger
    gsap.fromTo(
      [button1Ref.current, button2Ref.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );
  }, [inView]);

  const handleConsultationClick = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth',
      });
      setTimeout(() => {
        const footerContactBtn = document.querySelector(
          '[data-footer-contact]'
        ) as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[400px] w-full"
    >
      {/* Hidden image for SEO indexing */}
      <div className="hidden">
        <img
          src="https://res.cloudinary.com/designcenter/image/upload/Luxury%20Custom%20Furniture%20and%20Interior%20Design%20%E2%80%93%20DnD%20Design%20Center%20NYC.avif"
          alt="Luxury interior space featuring custom-designed sofas and handcrafted marble coffee table by D&D Design Center in Brooklyn."
          loading="lazy"
        />
      </div>

      {/* Background image with better ARIA attributes */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/designcenter/image/upload/Luxury%20Custom%20Furniture%20and%20Interior%20Design%20%E2%80%93%20DnD%20Design%20Center%20NYC.avif")',
        }}
        aria-hidden="true"
      >
        {/* Light black overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white" />

      {/* Content area */}
      <div className="relative h-full min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-16">
        <h2 
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
        >
          D&D Design Center<br />Luxury Custom Furniture Across America
        </h2>
        
        {/* Hidden description for screen readers */}
        <span className="sr-only">
          D&D Design Center bespoke furniture solutions in New York City
        </span>
        
        <p className="text-xl text-white mb-12">
          Book Your Complimentary Consultation
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            ref={button1Ref}
            onClick={handleConsultationClick}
            className="w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C5A267] text-white font-medium hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
          >
            CONTACT US
          </button>
          <Link
            ref={button2Ref}
            to="/productscollection"
            className="w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C5A267] text-white font-medium hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
          >
            VIEW COLLECTIONS
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkCallToAction;