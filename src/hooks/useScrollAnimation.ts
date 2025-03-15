import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  stagger?: number;
  duration?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  delay?: number;
  progressive?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progressive expansion animation for history section
      if (options.progressive) {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            height: '0%',
            y: 100,
          },
          {
            opacity: 1,
            height: '100%',
            y: 0,
            duration: options.duration ?? 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 1,
              toggleActions: 'play none none reverse',
              markers: options.markers ?? false,
            },
          }
        );
      } else {
        // Standard animation with enhanced delay and distance
        gsap.fromTo(
          element,
          {
            y: options.y ?? 100, // Increased default distance
            opacity: 0,
            scale: options.scale ?? 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: options.duration ?? 1.2, // Longer duration
            delay: options.delay ?? 0.2, // Added delay
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: options.start ?? 'top 85%', // Delayed start position
              end: options.end ?? 'top 40%',
              toggleActions: 'play none none reverse',
              markers: options.markers ?? false,
            },
          }
        );
      }

      // Enhanced stagger animations for children
      if (options.stagger) {
        const children = element.children;
        gsap.fromTo(
          children,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: options.stagger,
            delay: options.delay ?? 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [options]);

  return elementRef;
};