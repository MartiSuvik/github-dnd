import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

const VisionnaireThankYou = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const textRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !inView) return;

    const ctx = gsap.context(() => {
      // Text fade in animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      // Logos animation
      gsap.fromTo(
        logosRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: 'back.out(1.7)'
        }
      );
    });

    return () => ctx.revert();
  }, [inView]);

return (
  <section 
    ref={sectionRef}
    className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden leading-snug"
  >
    <div className="max-w-4xl mx-auto sm:px-8">
      {/* Text Content */}
      <div ref={textRef} className="mb-12 mr-20 ml-20 sm:mb-16">
        {/* Heading stays single-column and centered */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 sm:mb-10 text-center">
          A Partnership in Luxury Design Excellence
        </h2>

        {/* Wrap paragraphs in a columns container */}
        <div className="md:columns-2 md:gap-6 space-y-12 px-0 sm:px-20">
          <p className="text-base sm:text-lg md:text-xl text-gray-800 font-light text-justify">
            At D&D Design Center, we believe that true luxury is born from exceptional craftsmanship, visionary design, and a relentless pursuit of perfection. Our exclusive partnership with Visionnaire, a global leader in luxury Italian furniture and interior design, is a testament to this philosophy—a fusion of bespoke artistry and contemporary innovation that redefines high-end living in New York and beyond.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 font-light text-justify">
            Together, we have curated an exclusive collection that transcends conventional interior design, blending Italian elegance with modern sophistication. Each meticulously crafted piece embodies refined aesthetics, superior materials, and seamless functionality, creating an unparalleled luxury experience for the most discerning homeowners.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 font-light text-justify">
            This collaboration is more than a business venture; it’s a shared commitment to setting new benchmarks in luxury interior design. By bringing together world-class artisans, premium materials, and bespoke design solutions, we offer a distinctive approach that transforms New York’s most prestigious residences into architectural masterpieces.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 font-light text-justify">
            At the core of our partnership lies a mutual passion for timeless, sophisticated interiors—designs that reflect heritage, innovation, and impeccable taste. We are honored to embark on this journey with Visionnaire, shaping the future of luxury home design in New York, one masterpiece at a time.
          </p>
        </div>
      </div>

        {/* Logos - responsive layout */}
        <div ref={logosRef} className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-16">
          {/* D&D Logo */}
          <div className="relative flex items-center justify-center h-16 sm:h-20">
            <img 
              src="https://res.cloudinary.com/designcenter/image/upload/DnD_Logo_Transparent.svg" 
              alt="D&D Design Center" 
              className="h-16 sm:h-20 object-contain"
            />
          </div>
          
          {/* Divider - vertical on desktop, horizontal on mobile */}
          <div className="hidden sm:block w-px h-24 bg-gray-300"></div>
          <div className="block sm:hidden w-24 h-px bg-gray-300"></div>
          
          {/* Visionnaire Logo */}
          <div className="relative flex items-center justify-center h-10 sm:h-20">
            <img 
              src="https://res.cloudinary.com/designcenter/image/upload/Visionnaire_Logo.svg" 
              alt="Visionnaire" 
              className="h-8 sm:h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireThankYou;