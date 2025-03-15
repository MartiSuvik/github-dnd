'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, ArrowRight } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Bottom sheet container */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 w-full bg-[#1A1A1A]"
        style={{ height: '70vh' }}
        role="region"
        aria-label={`Expanded details for ${project.title}`}
      >
        <div className="h-full flex flex-col md:flex-row overflow-hidden">
          {/* Left: Smaller 16:9 image container */}
          <div className="relative flex-shrink-0 w-full max-w-xl bg-gray">
            <div className="aspect-w-16 aspect-h-9">
              <img
                ref={imageRef}
                src={project.imageUrl}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="relative flex-1 p-8 md:p-12 bg-[#1A1A1A] text-white overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-600"
              aria-label="Close expanded view"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <h2 ref={titleRef} className="text-4xl font-serif">
                  {project.styleName ?? project.title}
                </h2>
                <div
                  ref={subtitleRef}
                  className="text-[#B49157] uppercase tracking-wider text-sm mt-1"
                >
                  {project.style ? `${project.room} / ${project.style}` : project.room}
                </div>
              </div>

              <p ref={descriptionRef} className="text-white/80 leading-relaxed">
                Experience unparalleled luxury with our meticulously crafted {project.room?.toLowerCase()} designs. Each piece embodies the perfect harmony of form and function, elevating your living space with timeless elegance and sophisticated style.
              </p>

              {/* Contact / Inquire button */}
              <button
                ref={buttonRef}
                className="group flex items-center space-x-3 bg-[#B49157] text-white px-6 py-3 hover:bg-[#A38047] transition-colors duration-300"
                onClick={triggerFooterContact}
              >
                <span className="text-sm tracking-wider">INQUIRE NOW</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetExpandedCard;
