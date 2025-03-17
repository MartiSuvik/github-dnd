import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const VisionnaireIntroWithLoopingWords = () => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const textContentRef = useRef<HTMLDivElement>(null);
  const wordListRef = useRef<HTMLUListElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const cornerTopLeftRef = useRef<HTMLDivElement>(null);
  const cornerBottomRightRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !inView
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set([cornerTopLeftRef.current, cornerBottomRightRef.current], {
        scale: 0,
        opacity: 0,
        rotate: 180,
      });

      gsap.set(textContentRef.current, {
        opacity: 0,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      });

      gsap.set(
        [
          quoteRef.current,
          subtitleRef.current,
          paragraphRef.current,
          buttonRef.current,
          logoRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(textContentRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 0.4,
        ease: "power3.inOut",
      }).to(
        [cornerTopLeftRef.current, cornerBottomRightRef.current],
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

      const cornerRotation = gsap.to(
        [cornerTopLeftRef.current, cornerBottomRightRef.current],
        {
          rotate: 360,
          duration: 0.7,
          ease: "linear",
          paused: true,
          onComplete: () => {
            gsap.set([cornerTopLeftRef.current, cornerBottomRightRef.current], {
              rotate: 0,
            });

            gsap.to(
              [
                quoteRef.current,
                subtitleRef.current,
                paragraphRef.current,
                buttonRef.current,
                logoRef.current,
              ],
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power3.out",
              }
            );
          },
        }
      );

      tl.add(() => {
        cornerRotation.play();
      }, "-=0.2");

      if (wordListRef.current) {
        const wordList = wordListRef.current;
        const words = Array.from(wordList.children);
        const totalWords = words.length;
        const wordHeight = 100 / totalWords;
        let currentIndex = 0;

        // Simpler animation for mobile
        function updateEdgeWidth() {
          if (!edgeRef.current || !wordList) return;

          // Use simplified calculation for mobile
          const centerIndex = (currentIndex + 1) % totalWords;
          const centerWord = words[centerIndex] as HTMLElement;
          const centerWordWidth = isMobile
            ? Math.min(centerWord.offsetWidth, window.innerWidth * 0.8)
            : centerWord.getBoundingClientRect().width;

          const listWidth = wordList.getBoundingClientRect().width;
          const percentageWidth = (centerWordWidth / listWidth) * 100;

          gsap.to(edgeRef.current, {
            width: `${percentageWidth}%`,
            duration: 0.5,
            ease: "expo.out",
          });
        }

        function moveWords() {
          currentIndex++;

          // Shorter animation duration for mobile
          const animDuration = isMobile ? 1 : 1.2;

          gsap.to(wordList, {
            yPercent: -wordHeight * currentIndex,
            duration: animDuration,
            ease: "elastic.out(1, 0.85)",
            onStart: updateEdgeWidth,
            onComplete: () => {
              if (currentIndex >= totalWords - 3) {
                // Reset without animation for mobile
                if (isMobile) {
                  wordList.appendChild(wordList.children[0]);
                  currentIndex--;
                  gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
                  words.push(words.shift()!);
                } else {
                  wordList.appendChild(wordList.children[0]);
                  currentIndex--;
                  gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
                  words.push(words.shift()!);
                }
              }
            },
          });
        }

        updateEdgeWidth();

        // Set longer intervals for mobile to reduce CPU usage
        const interval = isMobile ? 3000 : 2000;

        const wordsTl = gsap.timeline({ repeat: -1, delay: 1 });
        wordsTl
          .call(moveWords)
          .to({}, { duration: interval / 1000 })
          .repeat(-1);

        return () => {
          wordsTl.kill();
        };
      }
    });

    return () => ctx.revert();
  }, [inView, isMobile]);

  const setRefs = (node: HTMLDivElement | null) => {
    // Call the inViewRef function (from useInView) with the node
    inViewRef(node);
    
    // Use a mutable ref object properly
    if (sectionRef) {
      // Instead of directly modifying .current, we assign the DOM element 
      // to the ref object through its identity
      Object.defineProperty(sectionRef, 'current', {
        value: node,
        writable: true
      });
    }
  };

  return (
    <section
      ref={setRefs}
      id="visionnaire-intro"
      className="relative py-16 sm:py-20 md:py-24 bg-white flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column - Text Content */}
        <div
          ref={textContentRef}
          className="relative space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-xl"
          style={{
            boxShadow: "0 8px 32px rgba(192, 169, 96, 0.1)",
            backdropFilter: "blur(8px)",
            willChange: "clip-path, transform",
          }}
        >
          <div
            ref={cornerTopLeftRef}
            className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-t-2 border-l-2 border-[#c5a267] opacity-50"
            style={{ transformOrigin: "top left" }}
          />
          <div
            ref={cornerBottomRightRef}
            className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-b-2 border-r-2 border-[#c5a267] opacity-50"
            style={{ transformOrigin: "bottom right" }}
          />

          <h2
            ref={quoteRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
          >
            Where <span className="text-[#c5a267]">Innovation</span> Meets{" "}
            <span className="text-[#c5a267]">Tradition</span>
          </h2>
          <h3
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-black font-light tracking-wide"
          >
            Redefining Luxury Living in New York
          </h3>
          <p
            ref={paragraphRef}
            className="text-base sm:text-lg text-gray-800 leading-relaxed font-light text-justify"
          >
            Our exclusive collaboration with Visionnaire represents the pinnacle
            of Italian craftsmanship and contemporary luxury interior design.
            Each piece is a testament to our shared commitment to excellence,
            blending traditional artisanal techniques with modern innovation to
            redefine luxury living.
          </p>

          {/* Updated Button with inline logo */}
          <div className="pt-4">
            <a
              ref={buttonRef}
              href="https://www.visionnaire-home.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-[#c5a267] text-white text-base sm:text-lg font-medium tracking-wider hover:bg-[#b49157] transition-all duration-200 group"
            >
              <img
                ref={logoRef}
                src="https://res.cloudinary.com/designcenter/image/upload/Visionnaire_Logo.svg"
                alt="Visionnaire"
                className="h-4 sm:h-5 object-contain invert brightness-0"
              />
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Right Column - Looping Words */}
        <div className="flex justify-center items-center">
          <div className="h-[2.7em] px-[0.1em] text-[8vw] sm:text-[6vw] md:text-[5vw] leading-[0.9] relative">
            <div className="w-full h-full relative overflow-hidden">
              <ul
                ref={wordListRef}
                className="text-center uppercase whitespace-nowrap flex flex-col items-center m-0 p-0 font-serif list-none relative text-[#c5a267]"
              >
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">LUXURY</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">MODERN</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">NEW</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">UNIQUE</p>
                </li>
                <li className="flex items-center justify-center h-[1em] relative">
                  <p className="m-0">VISIONNAIRE</p>
                </li>
              </ul>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                ref={edgeRef}
                className="h-[2px] transition-all duration-200"
                style={{
                  position: "absolute",
                  bottom: "0.7em",
                  transform: "translateY(100%)",
                  zIndex: 20,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireIntroWithLoopingWords;
