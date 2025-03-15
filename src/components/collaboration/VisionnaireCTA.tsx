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

const VisionnaireCTA: React.FC<CallToActionProps> = ({}) => {
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
      className="relative py-24 overflow-hidden bg-gradient-to-b from-[#272727] to-[#545454]"
    >
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <h2
          ref={headlineRef}
          className="text-5xl font-serif mb-4 bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent"
        >
          Transform Your Vision Into Reality
        </h2>
        <p className="text-xl text-white/60 mb-12">
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

export default VisionnaireCTA;
