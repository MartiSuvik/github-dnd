import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollArrow from "../ui/ScrollArrow";

const HomeHeroTop = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const craftedTitleRef = useRef<HTMLHeadingElement>(null); // "Crafted Interiors"
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    const playVideo = () => {
      if (video) {
        video.play().catch((error) => {
          console.log("Autoplay prevented:", error);
          // Optionally, you can show a play button to the user
        });
      }
    };

    // Ensure the video plays after user interaction
    document.addEventListener("click", playVideo, { once: true });

    return () => {
      document.removeEventListener("click", playVideo);
    };
  }, []);

  useEffect(() => {
    // Optimized GSAP animation without expensive per-letter transformations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        craftedTitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8 },
        "-=0.6"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 },
        "-=1.4"
      );

    gsap.to(arrowRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Removed per-letter animation and video/overlay animations for improved rendering.
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden perspective-1000">
      <div className="absolute inset-0 w-full h-full">
        <video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="none"
  className="absolute inset-0 w-full h-full object-cover scale-105"
  poster="https://res.cloudinary.com/designcenter/image/upload/Hero_Video_Banner.avif"
>
  <source
    src="https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:low/Hero_Luxury_Decor_Showcase_Slow_Motion.mp4"
    type="video/mp4"
  />
  Your browser does not support the video tag.
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
                className="mb-3 text-7xl sm:text-6xl md:text-8xl lg:text-10xl transform-gpu uppercase text-white/90 title-wrap"
                style={{ perspective: "800px" }}
              >
                <div className="title-container">
                  <span className="title-word">LUXURY</span>
                  <span className="title-word">ITALIAN</span>
                </div>
              </h1>

              <h2
                ref={craftedTitleRef}
                className="mb-3 md:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-6xl uppercase crafted-shine text-shadow"
                style={{ opacity: 1 }}
              >
                Crafted Interiors
              </h2>
              <p
                ref={subtitleRef}
                className="text-white/90 text-sm sm:text-base md:text-xl lg:text-2xl font-light text-shadow"
                style={{ willChange: "transform, opacity, filter" }}
              >
                Custom Crafted Designs for Elegant Living
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
          targetId="HomeProjectsCards"
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
        /* Subtle text shadow for better readability */
        .text-shadow {
          text-shadow: 0 2px 15px rgba(0, 0, 0, 0.6);
        }
        
        /* Title responsive layout */
        .title-container {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .title-word {
          display: block;
        }
        
        @media (min-width: 500px) {
          .title-container {
            flex-direction: row;
            gap: 0.5rem;
            justify-content: center;
          }
          
          .title-word {
            display: inline;
          }
        }
        
        /* Crafted Interiors: static white text with an animated golden shine inside */
        .crafted-shine {
          position: relative;
          /* Set a white base using background properties */
          background: linear-gradient(
            130deg,
            white 80%,
            rgba(197, 162, 103, 1) 80%,
            rgba(197, 162, 103, 1) 82%,
            white 82%,
            white 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }
        @keyframes shine {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
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

export default HomeHeroTop;
