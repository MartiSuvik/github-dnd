import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// Lazy load the AnimatedSection component
const AnimatedSection = lazy(() => import("./AnimatedSection"));

const LoadingFallback = () => (
  <div className="min-h-[300px] flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" />
  </div>
);

const HomeCollections = () => {
  // ✅ Intersection Observer for lazy loading
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
    triggerOnce: true,
  });

  // ✅ Lazy-load video only when in viewport
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !videoLoaded) {
      setVideoLoaded(true);
    }
  }, [isVisible, videoLoaded]);

  return (
    <section
      ref={elementRef}
      id="HomeCollections"
      className="py-12 md:py-20 bg-white"
      aria-label="Product Collections Section"
    >
      {isVisible && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* ✅ Lazy Load Video Section */}
            <div className="relative aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
              {videoLoaded && (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                >
                  <source
                    src="https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:good/Product_Furniture_Design_Collections_In_New_York_City.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* ✅ Animated Text Section */}
            <div className="space-y-6 md:space-y-8">
              <Suspense fallback={<LoadingFallback />}>
                <AnimatedSection>
                  <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
                      PRODUCT COLLECTION
                    </h2>
                    <p className="text-[#B49157] uppercase tracking-wider text-sm md:text-base">
                      Our Designers have the tacit permission to play outside the box
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Discover our exclusive curated collections, designed for those who
                    appreciate sophisticated aesthetics, superior craftsmanship, and lasting
                    quality.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={400}>
                  <Link
                    to="/productscollection"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
                  >
                    PRODUCT COLLECTIONS
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </AnimatedSection>
              </Suspense>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default HomeCollections;
