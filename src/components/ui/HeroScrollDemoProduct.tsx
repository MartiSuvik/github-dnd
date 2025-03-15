'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScrollDemoProduct() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);
  const keywordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!keywordsRef.current || !mainContainerRef.current) return;

    // Reset any existing animations
    gsap.set(keywordRefs.current, {
      opacity: 0,
      rotationX: -90,
      transformPerspective: 1000,
      transformOrigin: "50% 50% -100"
    });

    // Create the timeline with adjusted trigger point
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: keywordsRef.current,
        start: "top center+=200", // Adjusted to trigger later
        end: "bottom center",
        toggleActions: "play none none reverse",
        // markers: true, // Uncomment for debugging
      }
    });

    // Animate each keyword with a complex sequence
    keywordRefs.current.forEach((keyword, index) => {
      if (!keyword) return;
      
      tl.fromTo(keyword,
        {
          opacity: 0,
          rotationX: -90,
          y: 100,
          filter: "blur(10px)",
          textShadow: "0 0 0 rgba(204, 162, 103, 0)"
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 1.5,
          filter: "blur(0px)",
          textShadow: "0 0 30px rgba(204, 162, 103, 0.5)",
          ease: "power4.out",
          stagger: {
            amount: 0.5,
            from: "random"
          }
        },
        index * 0.3
      )
      .to(keyword, {
        duration: 2,
        textShadow: "0 0 0px rgba(204, 162, 103, 0)",
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      }, "-=1");
    });

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={mainContainerRef} className="flex flex-col overflow-hidden bg-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (min-width: 768px) {
            .md\\:p-4 {
              padding: 0 !important;
            }
          }
        `
      }} />
      
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Experience the <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#cca267] to-black">
                Future of Luxury
              </span>
            </h1>
          </>
        }
      >
        <div className="w-full h-full flex flex-col">
          <video
            src="https://res.cloudinary.com/dnddesigncenter/video/upload/Products_2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="mx-auto rounded-2xl object-cover h-full w-full"
          />
        </div>
      </ContainerScroll>

      <div 
        ref={keywordsRef} 
        className="flex flex-col items-center justify-center gap-6 py-24 relative" // Increased gap and padding
      >
        {['Mastery', 'Quality', 'Elegance'].map((word, index) => (
          <span
            key={word}
            ref={el => keywordRefs.current[index] = el}
            className="text-4xl md:text-[6rem] font-bold leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-[#cca267] to-black transform-gpu relative pb-2" // Added leading and bottom padding
            style={{
              willChange: 'transform, opacity, filter',
              transformStyle: 'preserve-3d'
            }}
          >
            {word}
            <div className="absolute inset-0 bg-gradient-to-r from-[#cca267]/20 to-transparent blur-xl opacity-0 transition-opacity duration-1000 pointer-events-none" />
          </span>
        ))}
      </div>
    </div>
  );
}