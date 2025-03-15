import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { VisionnaireSlider } from '../ui/VisionnaireSlider';

const showcaseItems = [
  {
    id: 1,
    title: '2024 Collection',
    description: 'The latest in contemporary luxury design',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571207/1_fpnhab.avif',
    bgColor: 'rgba(196, 185, 168, 0.9)',
  },
  {
    id: 2,
    title: '2023 Collection',
    description: 'Timeless elegance redefined',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571204/2_j3vyvq.avif',
    bgColor: 'rgba(205, 201, 198, 0.9)',
  },
  {
    id: 3,
    title: '2022 Collection',
    description: 'Where tradition meets innovation',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571202/3_iyxtvw.avif',
    bgColor: 'rgba(204, 178, 165, 0.9)',
  },
  {
    id: 4,
    title: '2021 Collection',
    description: 'The foundation of modern luxury',
    image:
      'https://res.cloudinary.com/dnddesigncenter/image/upload/v1740571205/4_zw7law.avif',
    bgColor: 'rgba(66, 79, 88, 0.9)',
  },
];

const VisionnaireShowcase = () => {
  const [, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate header
  useEffect(() => {
    if (!inView || !headerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
    
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
      );
    }
    
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' }
      );
    }
  }, [inView]);

  const handleScroll = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headerRef}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black text-center mb-8 sm:mb-12">
            EXPLORE THEIR COLLECTIONS
          </h2>
        </div>
        
        <div ref={contentRef}>
          <VisionnaireSlider currentIndex={currentIndex} onScroll={handleScroll}>
            {showcaseItems.map((item) => (
              <div 
                key={item.id}
                className="px-4 sm:px-6 md:px-8 w-full"
              >
                <div className="relative flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-2xl max-w-[280px] mx-auto" style={{ width: '70%' }}>
                  {/* Background Image */}
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  {/* Content Section */}
                  <div 
                    className="p-4 sm:p-6"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <h3 className="text-xl sm:text-2xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 mb-4 text-sm sm:text-base">
                      {item.description}
                    </p>
                    <a
                      href="https://catalogue.visionnaire-home.com/catalogues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 sm:space-x-3 text-white"
                    >
                      <span>View Collection</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </VisionnaireSlider>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {showcaseItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? 'bg-[#C5A267] scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400 scale-100'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* See More button */}
        <div className="py-8 sm:py-12 text-center">
          <a
            href="https://catalogue.visionnaire-home.com/catalogues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-3 sm:py-4 bg-[#C5A267] text-white text-base sm:text-lg font-medium tracking-wider hover:bg-[#A38047] transition-all duration-300 group"
            ref={buttonRef}
          >
            <span>See More Collections</span>
            <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 transform group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireShowcase;