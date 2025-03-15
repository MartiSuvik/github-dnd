import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import Tooltip from '../ui/Tooltip';

gsap.registerPlugin(ScrollTrigger);

// Interface for tooltip data to keep our component clean
interface TooltipData {
  x: string;  // Always use percentage for responsive positioning
  y: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  text: string;
  initiallyVisible?: boolean;
}

const SustainabilityShowcase: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const overlayTimerRef = useRef<number | null>(null);

  // Define tooltips with their positions relative to the image
  const tooltips: TooltipData[] = [
    {
      x: "68%",  // Chair position
      y: "64%", 
      position: "right",
      text: "Ergonomically designed chair crafted from sustainable materials."
    },
    {
      x: "30%",  // Cabinet position
      y: "50%",
      position: "left",
      text: "Modern storage solution using FSC-certified wood and eco-friendly finishes."
    }
  ];

  // Handle image load to ensure tooltips are positioned correctly
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Set timer to auto-hide overlay after 1.5 seconds
  useEffect(() => {
    if (isImageLoaded && showOverlay) {
      overlayTimerRef.current = window.setTimeout(() => {
        setShowOverlay(false);
      }, 1500);
    }

    return () => {
      if (overlayTimerRef.current) {
        clearTimeout(overlayTimerRef.current);
      }
    };
  }, [isImageLoaded, showOverlay]);

  // Animation effect when component comes into view
  useEffect(() => {
    if (!inView || !imageRef.current || !isImageLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Fade in the image and container
    gsap.fromTo(
      [imageRef.current, containerRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2
      }
    );
  }, [inView, isImageLoaded]);

  // Handle tooltip activation
  const handleTooltipClick = (index: number) => {
    setActiveTooltipIndex(index === activeTooltipIndex ? null : index);
    setShowOverlay(false); // Hide overlay when any tooltip is clicked
    
    if (overlayTimerRef.current) {
      clearTimeout(overlayTimerRef.current);
    }
  };

  // Handle overlay click to dismiss it
  const handleOverlayClick = () => {
    setShowOverlay(false);
    if (overlayTimerRef.current) {
      clearTimeout(overlayTimerRef.current);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4">
      <div
        ref={ref}
        className="max-w-xl mx-auto"
      >
        <h2 className="text-6xl font-serif text-center mb-8 text-[#3e533c]">SUSTAINABLE DESIGN FEATURES</h2>
        
        {/* Image container with tooltips */}
        <div
          ref={containerRef}
          className="relative rounded-lg shadow-xl overflow-hidden"
        >
          {/* The image */}
          <img
            ref={imageRef}
            src="https://res.cloudinary.com/dnddesigncenter/image/upload/dada_design-76g-UdCbEVU-unsplash_converted_g8oh74.avif"
            alt="Sustainable Design"
            className="w-full h-auto object-cover"
            loading="lazy"
            onLoad={handleImageLoad}
            style={{ opacity: isImageLoaded ? 1 : 0 }}
          />
          
          {/* Tooltips positioned relative to the image */}
          {isImageLoaded && tooltips.map((tooltip, index) => (
            <Tooltip
              key={index}
              x={tooltip.x}
              y={tooltip.y}
              offsetX={10}
              offsetY={0}
              position={tooltip.position}
              text={tooltip.text}
              className="transform-gpu"
              triggerClassName={`
                z-10 
                border-2 
                ${activeTooltipIndex === index ? 'border-green-500 bg-white/40' : 'border-green-300'}
              `}
              // Only trigger on click for mobile-friendliness
              triggerOnHover={false}
              triggerOnClick={true}
              // Show the active tooltip
              initiallyVisible={activeTooltipIndex === index}
              onClick={() => handleTooltipClick(index)}
            />
          ))}
          
          {/* Instruction overlay - shows before interaction and dismisses after time or click */}
          {showOverlay && activeTooltipIndex === null && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-500 cursor-pointer"
              onClick={handleOverlayClick}
            >
              <div className="text-white text-center p-6 max-w-sm">
                <p className="text-xl mb-4">Explore sustainable design features</p>
                <p className="text-sm opacity-80">Tap on the indicators to learn about sustainable elements</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Caption */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Our sustainable design approach focuses on environmentally responsible materials and construction methods.
        </p>
      </div>
    </section>
  );
};

export default SustainabilityShowcase;
