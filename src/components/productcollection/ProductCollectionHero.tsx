"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollArrow from "../ui/ScrollArrow";

const ProductCollectionHero = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimized GSAP animation without expensive per-letter transformations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

        // Background Image Animation
        tl.fromTo(
          imageRef.current,
          { scale: 1.1, filter: "brightness(0)" },
          { scale: 1, filter: "brightness(1)", duration: 0.8, ease: "power2.inOut" }
        )
          .fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1},
            "-=1.5"
          );    

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=0.6"
      )

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
        <img
          ref={imageRef}
          src="https://res.cloudinary.com/designcenter/image/upload/Home/Product_2/Kitchen/Traditional/Kitchen_Traditional_6.avif"
          alt="Luxury furniture collection showcasing high-end Italian craftsmanship"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          loading="eager"
          data-fetchpriority="high"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"
        />
      </div>

      <div className="flex min-h-svh items-center justify-center">
        <div className="container text-center mx-auto relative z-10 px-4">
          <div className="grid grid-cols-1 items-start gap-6 md:gap-12 py-16 md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div className="mx-auto">
              <h1
                ref={titleRef}
                className="mb-5 text-8xl md:text-10xl transform-gpu uppercase flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 text-white/90 title-wrap"
                style={{ perspective: "800px" }}
              >
                {"PRODUCT COLLECTION".split(" ").map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="flex justify-center space-x-2"
                  >
                    {word.split("").map((letter, index) => (
                      <span
                        key={`${wordIndex}-${index}`}
                        className="inline-block transform-gpu"
                        style={{ perspective: "800px" }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
              <p
                ref={subtitleRef}
                className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light text-shadow"
                style={{ willChange: "transform, opacity, filter" }}
              >
                The contemporaneity and internationality of being "Made in Italy"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={arrowRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <ScrollArrow
          targetId="product-gallery"
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
      `}</style>
    </section>
  );
};

export default ProductCollectionHero;
