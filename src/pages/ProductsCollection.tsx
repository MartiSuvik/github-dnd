import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCollectionHero from '../components/productcollection/ProductCollectionHero';
import ProductCollectionVisionnaire from '../components/productcollection/ProductCollectionVisionnaire';
import ProductCollectionInfo from '../components/productcollection/ProductCollectionInfo';
import ProductGalleryContent from '../components/productcollection/ProductGalleryContent';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';
import { ProductCollectionSteps } from '../components/productcollection/ProductCollectionSteps';
import { HeroScrollDemoProduct } from '../components/ui/HeroScrollDemoProduct';
import ProductCollectionCTA from '../components/productcollection/ProductCollectionCTA';
import { useFooterContact } from '../hooks/useFooterContact';

const ProductsCollection = () => {
  // State for UI
  const [isPullToRefreshing, setIsPullToRefreshing] = useState(false);
  const [, setLoadMoreCount] = useState(1);

  // Intersection observer for infinite scroll
  const { ref: infiniteScrollRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Handle infinite scroll when bottom is visible
  useEffect(() => {
    if (inView) {
      // Add a small delay to simulate loading more content
      const timer = setTimeout(() => {
        setLoadMoreCount((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Scroll to top when component mounts
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    };

    scrollToTop();
    // Use a timeout as a fallback in case the initial scroll doesn't work
    const timer = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle pull-to-refresh functionality
  const handlePullToRefresh = useCallback(() => {
    setIsPullToRefreshing(true);

    // Simulate refresh with a small delay
    setTimeout(() => {
      // Reset any necessary state here
      setLoadMoreCount(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsPullToRefreshing(false);
    }, 1000);
  }, []);

  // Setup swipe handlers for pull-to-refresh
  const swipeHandlers = useSwipeable({
    onSwipedDown: (eventData) => {
      // Only trigger pull-to-refresh if we're at the top of the page
      if (window.scrollY < 10 && eventData.deltaY > 70) {
        handlePullToRefresh();
      }
    },
    delta: 50, // Min distance before a swipe is recognized
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: false,
  });

  // Use the hook for consistent footer contact behavior
  const { triggerFooterContact } = useFooterContact();

  return (
    <div className="min-h-screen overflow-x-hidden" {...swipeHandlers}>
      {/* Pull-to-refresh indicator */}
      {isPullToRefreshing && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-16 bg-white/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#C5A267]"></div>
          <span className="ml-2 text-sm text-gray-600">Refreshing...</span>
        </div>
      )}

      {/* Mobile-optimized hero - should load quickly */}
      <ProductCollectionHero />

      {/* Main product gallery with lazy loading */}
      <ProductGalleryContent />

      {/* Lazy loaded sections */}
      <ProductCollectionVisionnaire />
      <ProductCollectionSteps />

      {/* HeroScrollDemo - lazy loaded */}
      <div className="w-full">
        <HeroScrollDemoProduct />
      </div>

      {/* Contact information */}
      <ProductCollectionInfo />

      {/* Call to action */}
      <ProductCollectionCTA 
        triggerFooterContact={triggerFooterContact} 
        scrollToProjects={() => {}} 
      />
    </div>
  );
};

export default ProductsCollection;
