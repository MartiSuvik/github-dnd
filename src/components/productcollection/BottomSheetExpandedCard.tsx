'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { X, ArrowRight, Maximize2 } from 'lucide-react';

interface Project {
  title: string;
  imageUrl: string;
  styleName?: string;
  room?: string;
  style?: string;
}

interface BottomSheetExpandedCardProps {
  project: Project;
  onClose: () => void;
}

const BottomSheetExpandedCard: React.FC<BottomSheetExpandedCardProps> = ({ project, onClose }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Check for landscape orientation and short screen
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      setIsShortScreen(window.innerHeight < 550);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  // Animate IN
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && sheetRef.current) {
      // Initial positions
      gsap.set(sheetRef.current, { y: '100%' });
      gsap.set(imageRef.current, { x: '-100%', scale: 1.2, opacity: 0 });
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonRef.current], {
        y: 30,
        opacity: 0,
      });

      // Timeline
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .to(sheetRef.current, { y: 0, duration: 1, ease: 'power4.out' })
        .to(
          imageRef.current,
          { x: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .to(
          [titleRef.current, subtitleRef.current, descriptionRef.current, buttonRef.current],
          { y: 0, opacity: 1, duration: 1, stagger: 0.3 },
          '-=0.4'
        );
    }

    return () => {
      gsap.killTweensOf([
        sheetRef.current,
        imageRef.current,
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        buttonRef.current,
      ]);
    };
  }, []);

  // Animate OUT
  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && sheetRef.current) {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.in' },
        onComplete: () => onClose(),
      });
      timeline
        .to(
          [buttonRef.current, descriptionRef.current, subtitleRef.current, titleRef.current],
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.05 }
        )
        .to(
          imageRef.current,
          { x: '-100%', scale: 1.2, opacity: 0, duration: 0.6 },
          '-=0.2'
        )
        .to(sheetRef.current, { y: '100%', duration: 0.5 }, '-=0.2');
    } else {
      onClose();
    }
  };

  // Function to trigger the contact form
  const triggerFooterContact = () => {
    // Optionally close the bottom sheet before triggering the contact form
    handleClose();

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

  // Handle fullscreen image view
  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Full Screen Image Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 p-3 bg-black/40 hover:bg-black/60 rounded-full transition-colors duration-300"
            aria-label="Close full screen view"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="max-h-screen max-w-full object-contain p-4"
          />
        </div>
      )}

      {/* Bottom sheet container */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 w-full bg-[#1A1A1A] overflow-hidden"
        style={{ 
          height: 'auto', 
          maxHeight: isShortScreen ? '95vh' : '90vh',
          minHeight: isShortScreen ? '65vh' : '50vh'
        }}
        role="region"
        aria-label={`Expanded details for ${project.title}`}
      >
        <div className={`h-full flex ${isLandscape && isShortScreen ? 'flex-row' : 'flex-col md:flex-row'} overflow-hidden`}>
          {/* Image container with adaptive sizing */}
          <div className={`relative flex-shrink-0 ${isLandscape && isShortScreen ? 'w-3/5' : 'w-full md:w-1/2 lg:w-3/5'}`}>
            <div 
              className={`relative ${isShortScreen ? 'h-full' : ''}`}
              style={isShortScreen && isLandscape ? {} : {
                paddingTop: isShortScreen ? '30%' : (isLandscape ? '30%' : (window.innerWidth < 640 ? '40%' : window.innerWidth < 768 ? '45%' : window.innerWidth < 1024 ? '75%' : '66.67%')),
              }}
            >
              {/* Magnifying glass button */}
              <button
                onClick={openFullScreen}
                className={`absolute ${isShortScreen ? 'top-1 right-1' : 'top-2 right-2'} p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300 z-10`}
                aria-label="View image full screen"
              >
                <Maximize2 className={`${isShortScreen ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
              </button>
              <img
                ref={imageRef}
                src={project.imageUrl}
                alt={project.title}
                className={`${isShortScreen && isLandscape ? 'relative' : 'absolute'} inset-0 w-full object-cover`}
              />
            </div>
          </div>

          {/* Content container */}
          <div 
            className={`relative flex-1 ${isShortScreen ? 'p-2 sm:p-3' : 'p-4 sm:p-6 md:p-8 lg:p-10'} bg-[#1A1A1A] text-white overflow-y-auto`}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className={`absolute ${isShortScreen ? 'top-1 right-1' : 'top-2 sm:top-4 right-2 sm:right-4'} p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-600 ${isShortScreen ? 'min-w-[32px] min-h-[32px]' : 'min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]'} flex items-center justify-center z-10`}
              aria-label="Close expanded view"
            >
              <X className={`${isShortScreen ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
            </button>

            {/* Text Content */}
            <div className={`${isShortScreen ? 'space-y-2' : 'space-y-3 sm:space-y-6'} max-w-prose ${isShortScreen ? 'pb-2' : 'pb-4 sm:pb-0'}`}>
              <div>
                <h2 
                  ref={titleRef} 
                  className={`${isShortScreen ? 'text-lg' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'} font-serif ${isShortScreen ? 'mb-0.5' : 'mb-1 sm:mb-2'} pr-10`}
                >
                  {project.styleName ?? project.title}
                </h2>
                <div
                  ref={subtitleRef}
                  className={`text-[#B49157] uppercase tracking-wider ${isShortScreen ? 'text-xs' : 'text-xs sm:text-sm md:text-base'}`}
                >
                  {project.style ? `${project.room} / ${project.style}` : project.room}
                </div>
              </div>

              <p 
                ref={descriptionRef} 
                className={`text-white/80 ${isShortScreen ? 'text-xs leading-tight' : 'text-sm sm:text-base md:text-lg leading-relaxed'} max-w-[75ch] ${isShortScreen ? 'line-clamp-3 sm:line-clamp-none' : ''}`}
              >
                Experience unparalleled luxury with our meticulously crafted {project.room?.toLowerCase()} designs. 
                Each piece embodies the perfect harmony of form and function, elevating your living space 
                with timeless elegance and sophisticated style.
              </p>

              {/* Contact / Inquire button */}
              <button
                ref={buttonRef}
                className={`group inline-flex items-center ${isShortScreen ? 'space-x-1' : 'space-x-2 sm:space-x-3'} bg-[#B49157] text-white ${isShortScreen ? 'px-3 py-1.5' : 'px-4 sm:px-6 py-2 sm:py-3'} hover:bg-[#A38047] transition-colors duration-300 ${isShortScreen ? 'min-w-[120px] min-h-[32px]' : 'min-w-[140px] sm:min-w-[160px] min-h-[40px] sm:min-h-[44px]'} mt-2 sm:mt-0`}
                onClick={triggerFooterContact}
              >
                <span className={`${isShortScreen ? 'text-xs' : 'text-xs sm:text-sm'} tracking-wider`}>INQUIRE NOW</span>
                <ArrowRight className={`${isShortScreen ? 'w-3 h-3' : 'w-3 h-3 sm:w-4 sm:h-4'} transform group-hover:translate-x-1 transition-transform duration-300`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetExpandedCard;