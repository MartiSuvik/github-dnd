"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import ScrollArrow from "../ui/ScrollArrow";

const ProductCollectionHero: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Use intersection observer to trigger animations only when in view
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Only run animation when in view
    if (!inView) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Split "PRODUCT COLLECTION" into letters for individual animation
    const titleLetters = titleRef.current?.querySelectorAll("span");

    // Set initial styles
    if (titleLetters) {
      gsap.set(titleLetters, {
        opacity: 0,
        rotateX: -90,
        transformOrigin: "top center",
      });
    }

    // Reveal animation sequence - simplified for mobile performance
    tl.fromTo(
      imageRef.current,
      {
        scale: 1.1,
        filter: "brightness(0)",
      },
      {
        scale: 1,
        filter: "brightness(1)",
        duration: 2.4,
        ease: "power2.inOut",
      }
    ).fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.8 },
      "-=2"
    );

    if (titleLetters) {
      tl.to(
        titleLetters,
        {
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=1"
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 },
          "-=1.4"
        )
        .fromTo(
          arrowRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
          "-=0.5"
        );
    }

    // Continuous arrow bounce animation
    gsap.to(arrowRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="product-collection-hero"
      className="relative h-screen overflow-hidden perspective-1000"
      aria-label="Product Collection Hero"
    >
      {/* Hero Background - Optimized for mobile */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/dnddesigncenter/image/upload/Kitchen_Traditional_6.avif"
          alt="Luxury interior design"
          className="w-full h-full object-cover transform-gpu scale-105"
          loading="eager" // Load this image immediately
          data-fetchpriority="high" // Signal high priority to browser
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/100"
        />
      </div>

      {/* Content - Optimized for mobile viewing */}
      <div className="flex min-h-svh items-center justify-center">
        <div
          ref={contentRef}
          className="container text-center mx-auto relative z-10 px-4"
        >
          <div className="grid grid-cols-1 items-start gap-6 md:gap-12 py-16 md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div className="mx-auto">
              {/* PRODUCT COLLECTION with Blinders Effect */}
              <h1
                ref={titleRef}
                className="mb-5 text-8xl md:mb-6 md:text-9xl lg:text-10xl transform-gpu uppercase text-white/90 flex flex-row justify-center"
                style={{ perspective: "800px" }}
              >
                <span className="flex justify-center">
                  {"PRODUCT".split("").map((letter, index) => (
                    <span
                      key={`p-${index}`}
                      className="inline-block transform-gpu"
                      style={{ perspective: "800px" }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="flex justify-center sm:ml-2">
                  {"COLLECTION".split("").map((letter, index) => (
                    <span
                      key={`c-${index}`}
                      className="inline-block transform-gpu"
                      style={{ perspective: "800px" }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-white/90 text-xl md:text-2xl font-light"
                style={{ willChange: "transform, opacity, filter" }}
              >
                The contemporaneity and internationality of being "Made in
                Italy"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <ScrollArrow
          targetId="product-gallery"
          className="w-12 h-12 text-white hover:text-[#C5A267] transition-colors duration-300"
        />
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
        
        @media (max-width: 567px) {
          #product-collection-hero h1 {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductCollectionHero;
