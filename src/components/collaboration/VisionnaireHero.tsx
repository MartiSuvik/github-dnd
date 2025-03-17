"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollArrow from "../ui/ScrollArrow";

const VisionnaireHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Ensure the video plays after user interaction
  useEffect(() => {
    const video = videoRef.current;
    const playVideo = () => {
      if (video) {
        video.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    document.addEventListener("click", playVideo, { once: true });
    return () => {
      document.removeEventListener("click", playVideo);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

    // Background Video and Overlay
    tl.fromTo(
      videoRef.current,
      { scale: 1.1, filter: "brightness(0)", webkitFilter: "brightness(0)" },
      { scale: 1, filter: "brightness(1)", webkitFilter: "brightness(1)", duration: 0.8, ease: "power2.inOut" }
    ).fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "<"
    );

    // Title and Subtitle Animations
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 },
      "-=0.6"
    );

    // Arrow Animation
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden perspective-1000"
      aria-label="Visionnaire Hero"
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster="https://res.cloudinary.com/designcenter/image/upload/Bespoke_Furniture_Collection_In_New_York_City.avif"
        >
          <source
            src="https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:good/visionnaire-luxury-collection.mp4"
            type="video/mp4"
          />
        </video>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"
        />
      </div>

      <div className="flex min-h-svh items-center justify-center">
        <div className="container text-center mx-auto relative z-10 px-4">
          <div className="grid grid-cols-1 items-start gap-6 md:gap-12 py-12 md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div className="mx-auto">
              <h1
                ref={titleRef}
                className="mb-5 text-5xl sm:text-6xl md:text-8xl lg:text-10xl transform-gpu uppercase text-white/90 title-wrap"
                style={{ perspective: "800px" }}
              >
                {/* Modified title layout with better mobile responsiveness */}
                <div className="flex flex-col justify-center space-y-1 sm:space-y-2">
                  <span className="block">VISIONNAIRE</span>
                </div>
              </h1>
              <p
                ref={subtitleRef}
                className="text-white/90 text-sm sm:text-base md:text-xl lg:text-2xl font-light text-shadow"
                style={{ willChange: "transform, opacity, filter" }}
              >
                A Collaboration in Pursuit of Perfection <br className="block sm:hidden" /><span className="whitespace-nowrap">Pursuit of Perfection</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={arrowRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-arrow"
      >
        <ScrollArrow
          targetId="visionnaire-intro"
          className="w-10 h-10 md:w-12 md:h-12 text-white hover:text-[#C5A267] transition-colors duration-300"
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
        .text-shadow {
          text-shadow: 0 2px 15px rgba(0, 0, 0, 0.6);
        }
        /* Hide scroll arrow when screen is in landscape mode (width > height) */
        @media (orientation: landscape) and (max-height: 500px) {
          .scroll-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default VisionnaireHero;
