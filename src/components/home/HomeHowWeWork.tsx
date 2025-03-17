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

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load component. Please refresh the page.
      </div>
    );
  }
};

const HomeHowWeWork = () => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
    triggerOnce: true,
  });

  // ✅ Use useRef for video & useState for lazy loading
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
      id="italian-craftsmanship"
      className="py-12 md:py-20 bg-gray-100"
      aria-label="How We Work Section"
    >
      {isVisible && (
        <ErrorBoundary>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Content Section with staggered animations */}
              <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
                <Suspense fallback={<LoadingFallback />}>
                  <AnimatedSection>
                    <div className="space-y-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
                        HOW WE DESIGN
                      </h2>
                      <p className="text-[#B49157] uppercase tracking-wider text-sm md:text-base">
                        How We Transform your Home From Vision to Reality
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={200}>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      At D&D Design Center, we blend craftsmanship with
                      innovation to bring your vision to life. From personalized
                      consultations to precision execution.
                    </p>
                  </AnimatedSection>

                  <AnimatedSection delay={400}>
                    <Link
                      to="/how-we-work"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
                    >
                      HOW WE WORK
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </AnimatedSection>
                </Suspense>
              </div>

              {/* ✅ Lazy Load Video Section */}
              <div className="order-1 lg:order-2 relative aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
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
                      src="https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:good/How_We_Work_Craftsmanship_Near_Me_In_New_York_City.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </ErrorBoundary>
      )}
    </section>
  );
};

export default HomeHowWeWork;