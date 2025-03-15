import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollManager } from "../../hooks/useScrollManager";
import ImageGallery from "./ImageGallery";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { mainCategories, Category, Subcategory, DisplayItem } from "./Categories";


gsap.registerPlugin(ScrollTrigger);

const ProjectCards = () => {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mainCategories.map((category: Category) => (
          <div key={category.id} className="bg-white p-4 shadow-lg rounded-lg">
            
            {/* ✅ SEO-Optimized Image */}
            <img 
              src={category.image} 
              alt={category.description} 
              title={category.title}
              loading="lazy"
              className="w-full h-48 object-cover rounded-md"
            />

            <h2 className="text-xl font-bold mt-4">{category.title}</h2>
            <p className="text-gray-600">{category.description}</p>

            {/* ✅ Render Subcategories If Available */}
            {category.hasSubcategories && category.subcategories && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Explore More:</h3>
                <ul className="list-disc list-inside">
                  {category.subcategories.map((sub: Subcategory) => (
                    <li key={sub.id}>
                      <img 
                        src={sub.image} 
                        alt={sub.description} 
                        title={sub.title}
                        loading="lazy"
                        className="w-full h-32 object-cover rounded-md mt-2"
                      />
                      <h4 className="font-medium mt-2">{sub.title}</h4>
                      <p className="text-gray-500">{sub.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const HomeProjectsCards = () => {
  // State management
  const [activeId, setActiveId] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<DisplayItem | null>(null);
  const [displayLevel, setDisplayLevel] = useState<"main" | "sub">("main");
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const [displayItems, setDisplayItems] =
    useState<DisplayItem[]>(mainCategories);
  const [visibleCards, setVisibleCards] = useState<number>(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerHeight, setContainerHeight] = useState<string>("auto");

  // Refs for animations
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollManager = useScrollManager();
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const hasAnimated = useRef(false);

  // Determine how many cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(6);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(6);
      } else {
        setVisibleCards(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initial fade-in on scroll (only when in main view)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (displayLevel !== "main") return;
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const isDesktop = window.innerWidth >= 1024;
    const cardsToAnimate = isDesktop
      ? cardRefs.current.slice(0, visibleCards)
      : cardRefs.current.slice(1, visibleCards);

    const ctx = gsap.context(() => {
      // Set the cards to hidden (opacity: 0)
      gsap.set(cardsToAnimate, { opacity: 0 });
      // Create a ScrollTrigger that fades the cards in when the section enters.
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top bottom", // When the top of the container reaches the bottom of the viewport.
        onEnter: () => {
          gsap
            .timeline({ delay: 1, immediateRender: false })
            .to(cardsToAnimate, {
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [visibleCards, displayLevel]);

  // Animate back button when it appears
  useEffect(() => {
    if (displayLevel === "sub" && backButtonRef.current) {
      gsap.fromTo(
        backButtonRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [displayLevel]);

  const handleOptionClick = (item: DisplayItem) => {
    if (isTransitioning) return;

    const container = cardsContainerRef.current;
    if (container) {
      setContainerHeight(`${container.offsetHeight}px`);
    }

    if (
      "hasSubcategories" in item &&
      item.hasSubcategories &&
      item.subcategories
    ) {
      if (activeId === item.id) {
        if (container) {
          setIsTransitioning(true);
          // Fade out the container completely.
          gsap.to(container, {
            opacity: 0,
            duration: 1.4,
            ease: "power2.inOut",
            onComplete: () => {
              // Update state only after the fade-out is complete.
              setCurrentParentId(item.id);
              if (item.subcategories) {
                setDisplayItems(item.subcategories);
                setDisplayLevel("sub");
                setActiveId(item.subcategories[0].id);
              }
              // Ensure container remains hidden.
              gsap.set(container, { opacity: 0 });
              // Fade the container back in.
              gsap.to(container, {
                opacity: 1,
                duration: 1.4,
                ease: "power2.out",
                onComplete: () => {
                  setIsTransitioning(false);
                  setContainerHeight("auto");
                },
              });
            },
          });
        }
      } else {
        setActiveId(item.id);
      }
    } else {
      if (activeId === item.id) {
        setSelectedItem(item);
      } else {
        setActiveId(item.id);
      }
    }
  };

  const handleBackClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const container = cardsContainerRef.current;
    if (container) {
      setContainerHeight(`${container.offsetHeight}px`);
      gsap.to(container, {
        opacity: 0,
        duration: 1.4,
        ease: "power2.inOut",
        onComplete: () => {
          setDisplayItems(mainCategories);
          setDisplayLevel("main");
          setCurrentParentId(null);
          setActiveId(1);
          gsap.set(container, { opacity: 0 });
          gsap.to(container, {
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
            onComplete: () => {
              setIsTransitioning(false);
              setContainerHeight("auto");
            },
          });
        },
      });
    }
  };

  const handleClose = () => {
    setSelectedItem(null);
    scrollManager.unlockScroll();
  };

  const triggerFooterContact = () => {
    const footerElement = document.querySelector("#footer");
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: "smooth",
      });
      setTimeout(() => {
        const footerContactBtn = document.querySelector(
          "[data-footer-contact]"
        ) as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  function normalizeStyle(title: string): string {
    // Trim whitespace, convert to uppercase, replace spaces with underscores,
    // and remove any non-alphanumeric characters (except underscores)
    return title
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/[^A-Z0-9_]/g, "");
  }
  function normalizeRoom(title: string): string {
    return title
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/[^A-Z0-9_]/g, "");
  }
  return (
    <section
      id="HomeProjectsCards"
      className="relative min-h-screen bg-gray-50 py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 mb-2">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-center">
          PRODUCT COLLECTION
        </h1>
      </div>
      <div className="max-w-1xl mx-auto px-2">
      <h1 className="text-lg sm:text-xl md:text-2xl font-sans text-[#B49157] text-center custom-pulse">
  {displayLevel === "sub" && currentParentId
    ? mainCategories
        .find((cat) => cat.id === currentParentId)
        ?.title.toUpperCase() === "FURNITURE"
      ? "Pick a Room"
      : "Pick a Style"
    : "Click on the cards to get a quick glance"}
</h1>
</div>

<div
  ref={cardsContainerRef}
  className={`
    ${
      displayLevel === "sub"
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 md:p-8"
        : "grid grid-cols-2 md:flex md:flex-wrap gap-4 p-6 md:p-8"
    }
    w-full max-w-5xl mx-auto mt-2 relative
  `}
  style={{
    minHeight: containerHeight,
    pointerEvents: isTransitioning ? "none" : "auto",
  }}
>
  {displayItems.slice(0, visibleCards).map((item, index) => (
    <div
      key={item.id}
      ref={(el) => (cardRefs.current[index] = el)}
      onClick={() => handleOptionClick(item)}
      className={`
        group relative
        h-[300px] md:h-[450px]
        overflow-hidden 
        cursor-pointer 
        ease-out 
        duration-1000
        will-change-transform 
        transform 
        hover:scale-[1.02]
        ${
          displayLevel === "sub"
            ? "w-full"
            : activeId === item.id
            ? "md:flex-[2.5]"
            : "md:flex-[0.5]"
        }
      `}
    >
      {displayLevel === "sub" &&
        currentParentId &&
        (() => {
          const category = mainCategories.find(
            (cat) => cat.id === currentParentId
          )?.title;
          const label = category === "FURNITURE" ? "ROOM" : "STYLE";
          return (
            <div className="absolute top-2 left-2 z-10 p-1">
              <h2 className="text-sm md:text-base font-serif text-white">
                {label}
              </h2>
            </div>
          );
        })()}

      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500"
          style={{
            backgroundImage: `url(${item.image})`,
            transform: activeId === item.id ? "scale(1)" : "scale(1.2)",
          }}
        />
      </div>

      <div className="absolute inset-0" />

      {/* Glow edge (appears on hover) */}
      <div
        ref={(el) => (glowRefs.current[index] = el)}
        className="
          absolute 
          top-0 
          bottom-0 
          right-0 
          w-2 
          bg-gradient-to-r 
          from-transparent 
          to-[#FFF] 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-300
        "
      ></div>

      {/* Content gradient */}
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end bg-gradient-to-l from-transparent via-black/10 to-black/80">
        {activeId !== item.id ? (
          <div className="absolute inset-0 flex items-center justify-center p-0.5">
            <h3 className="text-white text-center text-base sm:text-xl font-serif leading-tight line-clamp-2">
              {item.title}
            </h3>
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-white/90 text-xl sm:text-2xl font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Haptic circle indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20">
              <div className="w-full h-full rounded-full bg-white/80 pointer-events-none z-10 opacity-30 animate-pulse-slow transition-opacity duration-300" />
            </div>
          </>
        )}
      </div>

      {/* Always-visible arrow, rotates if expanded */}
      <div
        ref={(el) => (arrowRefs.current[index] = el)}
        className="
          absolute 
          bottom-4 
          right-4 
          flex 
          items-center 
          justify-center 
          transition-transform 
          duration-300 
          group-hover:translate-y-1
          min-w-[44px]
          min-h-[44px]
          z-20
        "
      >
        <ChevronDown
          className={`
            w-6 h-6 sm:w-8 sm:h-8
            text-[#FFD700] 
            opacity-70 
            group-hover:opacity-100 
            transform-gpu 
            transition-all 
            duration-300
            ${activeId === item.id ? "rotate-180" : ""}
          `}
          aria-label="Expand for more details"
        />
      </div>
    </div>
  ))}
</div>

{selectedItem && (
  <ImageGallery
    // ✅ Normalize Room & Style to match Airtable's format
    category={
      displayLevel === "sub"
        ? normalizeRoom(mainCategories.find((cat) => cat.id === currentParentId)?.title || "")
        : normalizeRoom(selectedItem.title)
    }
    style={
      displayLevel === "sub"
        ? normalizeStyle(selectedItem.title)
        : "NONE" // or "N/A" if main category has no sub-styles
    }
    onClose={handleClose}
  />
)}



      {/* Footer buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
        {displayLevel === "sub" && (
          <button
            ref={backButtonRef}
            onClick={handleBackClick}
            className="
        w-full sm:w-48 h-[44px]
        flex items-center justify-center gap-2
        px-4 py-3
        bg-[#B49157]
        text-white
        text-sm
        uppercase
        tracking-wider
        hover:bg-[#A38047]
        transition-colors
        duration-200
        min-h-[44px]
      "
          >
            <ChevronLeft className="w-5 h-5" />
            <span>CATEGORIES</span>
          </button>
        )}

        <Link to="/ProductsCollection" className="w-full sm:w-48">
          <button
            className="
        w-full sm:w-48 h-[44px]
        px-4 py-3
        bg-[#B49157]
        text-white
        text-sm
        uppercase
        tracking-wider
        hover:bg-[#A38047]
        transition-colors
        duration-200
        min-h-[44px]
      "
          >
            View all
          </button>
        </Link>

        <button
          onClick={triggerFooterContact}
          className="
      w-full sm:w-48 h-[44px]
      px-4 py-3
      bg-[#B49157]
      text-white
      text-sm
      uppercase
      tracking-wider
      hover:bg-[#A38047]
      transition-colors
      duration-200
      min-h-[44px]
    "
        >
          Contact us
        </button>
      </div>

      {/* Optional custom keyframes for a fancier pulse glow if desired */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.2;
            box-shadow: 0 0 5px 1px #ffd700;
          }
          50% {
            opacity: 0.5;
            box-shadow: 0 0 15px 2px #ffd700;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HomeProjectsCards;
