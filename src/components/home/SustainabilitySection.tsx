import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Zap, Hammer, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface SustainabilityFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const SustainabilityFeature: React.FC<SustainabilityFeatureProps> = ({ 
  icon, 
  title, 
  description, 
  delay 
}) => {
  const featureRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        featureRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.3, 
          delay: delay,
          scrollTrigger: {
            trigger: featureRef.current,
            start: 'top 80%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, [delay]);

  // Handle hover/tap effects
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (iconContainerRef.current) {
      gsap.to(iconContainerRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: 'power1.inOut',
        boxShadow: '0 0 15px rgba(197, 162, 103, 0.5)'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (iconContainerRef.current) {
      gsap.to(iconContainerRef.current, {
        scale: 1,
        duration: 1,
        ease: 'power1.inOut',
        boxShadow: 'none'
      });
    }
  };
  
  return (
    <div 
      ref={featureRef} 
      className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg flex flex-col items-center text-center transition-all duration-500 hover:scale-105 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <div 
        ref={iconContainerRef}
        className="p-3 md:p-4 bg-[#C5A267]/20 rounded-full mb-3 md:mb-4 text-[#C5A267] transition-all duration-500"
      >
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-medium mb-2 tracking-wide">{title}</h3>
      <p className="text-white/70 text-sm md:text-base leading-relaxed font-regular">{description}</p>
    </div>
  );
};

const SustainabilitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const ctx = gsap.context(() => {
      // Parallax effect for the background
      gsap.fromTo(
        sectionRef.current,
        { backgroundPositionY: '0%' },
        {
          backgroundPositionY: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );
      
      // Text animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
      
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
      
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-32 relative bg-cover bg-center text-white"
      style={{ 
        backgroundImage: 'url("https://res.cloudinary.com/designcenter/image/upload/Eco-Friendly%20Luxury%20Furniture%20%E2%80%93%20Sustainable%20Design%20Collection.avif")',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* ✅ SEO-Optimized Hidden Image for Indexing */}
      <div className="hidden">
        <img 
          src="https://res.cloudinary.com/designcenter/image/upload/Eco-Friendly%20Luxury%20Furniture%20%E2%80%93%20Sustainable%20Design%20Collection.avif" 
          alt="Sustainable furniture design featuring sculptural eco-friendly materials for luxury interiors."
          title="Eco-Friendly Luxury Furniture – Sustainable Design Collection"
          loading="lazy"
        />
      </div>

      {/* ✅ Open Graph & SEO Meta Tags */}
      <meta property="og:image" content="https://res.cloudinary.com/designcenter/image/upload/Eco-Friendly%20Luxury%20Furniture%20%E2%80%93%20Sustainable%20Design%20Collection.avif" />
      <meta property="og:title" content="Eco-Friendly Luxury Furniture – Sustainable Design Collection" />
      <meta property="og:description" content="Sustainable furniture design featuring sculptural eco-friendly materials for luxury interiors." />
      <meta name="keywords" content="sustainable design, eco-friendly furniture, luxury ESG, high-end green interiors" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-4 font-light tracking-wide"
          >
            SUSTAINABILITY
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl text-white/80 font-light tracking-wide"
          >
            Our commitment to eco-conscious luxury design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-24">
          <SustainabilityFeature 
            icon={<Leaf className="w-6 h-6 md:w-8 md:h-8" />}
            title="ECO-FRIENDLY"
            description="We minimize environmental impact while maintaining the highest standards of quality."
            delay={0.3}
          />
          
          <SustainabilityFeature 
            icon={<Zap className="w-6 h-6 md:w-8 md:h-8" />}
            title="EFFICIENT"
            description="We follow energy-saving principles that reduce consumption without sacrificing aesthetics."
            delay={0.6}
          />
          
          <SustainabilityFeature 
            icon={<Hammer className="w-6 h-6 md:w-8 md:h-8" />}
            title="ETHICAL"
            description="We partner with artisans who share traditional craftsmanship that stands the test of time."
            delay={0.9}
          />
        </div>

        <div className="text-center">
          <Link 
            to="/sustainability"
            ref={ctaRef}
            className="inline-flex items-center gap-2 px-6 py-4 bg-[#C5A267] text-black font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
          >
            <span className="font-regular tracking-wide">EXPLORE OUR ECO-JOURNEY</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;