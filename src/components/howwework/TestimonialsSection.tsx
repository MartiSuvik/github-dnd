import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  position?: string;
  quote: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  currentTestimonial,
  setCurrentTestimonial,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || !testimonialRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      testimonialRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [inView, currentTestimonial]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe left
        setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
      } else {
        // Swipe right
        setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A] text-center mb-3">
          TESTIMONIALS
        </h2>
        <div className="relative overflow-hidden">
          <div 
            className="min-h-[280px] sm:min-h-[320px] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial, index) =>
              index === currentTestimonial ? (
                <div
                  key={testimonial.id}
                  ref={testimonialRef}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="max-w-xl mx-auto text-center p-6 sm:p-8 border border-[#C4A661]/30 rounded-lg shadow-lg">
                    {/* Display rating stars if rating exists */}
                    {testimonial.rating !== undefined && (
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#C4A661] fill-current"
                          />
                        ))}
                      </div>
                    )}
                    <blockquote className="text-base sm:text-lg md:text-xl text-[#1A1A1A] mb-4 font-sans">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="text-[#C4A661] font-sans text-base sm:text-lg font-semibold">
                      {testimonial.name}
                    </div>
                    {testimonial.position && (
                      <div className="text-[#1A1A1A]/60 font-sans text-xs sm:text-sm">
                        {testimonial.position}
                      </div>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Testimonial Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  currentTestimonial === index
                    ? 'bg-[#C4A661]'
                    : 'bg-[#1A1A1A]/20'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
