import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Airtable from 'airtable';
import { Link } from 'react-router-dom';

interface Photo {
  id: string;
  url: string;
  category: string;
  style: string;
}

interface ImageGalleryProps {
  category: string;
  style: string;
  onClose: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ category, style, onClose }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const mainImageRef = useRef<HTMLImageElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<number>();
  const preloadedImages = useRef<Set<string>>(new Set());
  const galleryRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: photos.length,
    getScrollElement: () => thumbnailsRef.current,
    estimateSize: () => 97, // 77px + 20px for spacing and borders
    overscan: 5,
    horizontal: true,
  });

  // Show gallery with animation after initial render
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY })
        .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

      // Determine the filter based on category and style
      let filterFormula = '';
      
      if (category === 'KITCHEN') {
        // For Kitchen, filter by category and style
        filterFormula = `AND({Room} = 'Kitchen', {Style} = '${style}')`;
      } else if (category === 'LIVING ROOM' || category === 'DINING ROOM' || category === 'BEDROOM') {
        // For Furniture subcategories, filter by room
        filterFormula = `{Room} = '${category}'`;
      } else {
        // For other main categories, filter by category
        filterFormula = `{Room} = '${category}'`;
      }

      const records = await base('database')
        .select({
          filterByFormula: filterFormula
        })
        .all();

      const fetchedPhotos = records.map(record => ({
        id: record.id,
        url: record.fields['Cloudinary URL'] as string,
        category: record.fields['Room'] as string,
        style: record.fields['Style'] as string,
      }));

      if (fetchedPhotos.length === 0) {
        throw new Error('No images found for this category and style.');
      }

      setPhotos(fetchedPhotos);
      // Preload the first image after setting the photos
      if (fetchedPhotos.length > 0) {
        await preloadImage(fetchedPhotos[0].url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
      console.error('Error fetching photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const preloadImage = (url: string): Promise<void> => {
    if (preloadedImages.current.has(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        preloadedImages.current.add(url);
        resolve();
      };
      img.onerror = reject;
    });
  };

  const preloadAdjacentImages = useCallback(() => {
    if (photos.length === 0) return;

    const nextIndex = (currentIndex + 1) % photos.length;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;

    Promise.all([
      preloadImage(photos[nextIndex].url),
      preloadImage(photos[prevIndex].url)
    ]).catch(console.error);
  }, [currentIndex, photos]);

  useEffect(() => {
    fetchPhotos();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [category, style]);

  useEffect(() => {
    if (autoplayEnabled && photos.length > 0) {
      autoplayTimerRef.current = window.setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % photos.length);
      }, 5000);

      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }
  }, [autoplayEnabled, photos.length]);

  useEffect(() => {
    if (photos.length > 0) {
      preloadAdjacentImages();
    }
  }, [currentIndex, preloadAdjacentImages, photos.length]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handlePrevious = () => {
    if (photos.length > 0) {
      setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
      setAutoplayEnabled(false);
    }
  };

  const handleNext = () => {
    if (photos.length > 0) {
      setCurrentIndex(prev => (prev + 1) % photos.length);
      setAutoplayEnabled(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // *** FOOTER SCROLL LOGIC ***
  const triggerFooterContact = (): void => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      // Calculate the total scroll height and scroll to the bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth'
      });
      
      // After a short delay, trigger the footer's contact button
      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement | null;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <div className="text-white text-center p-8">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors min-h-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div 
      ref={galleryRef}
      className={`fixed inset-0 bg-black/90 z-50 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
          }}
          className="p-2 text-white/80 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`h-full flex flex-col justify-center items-center pt-12 pb-8 px-4 md:px-8 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-4'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
        ) : photos.length > 0 && currentPhoto ? (
          <>
            <div className="relative w-full max-w-[880px] h-[300px] md:h-[495px] bg-black/30 rounded-lg group">
              <img
                ref={mainImageRef}
                src={currentPhoto.url}
                alt={`${category} ${style}`}
                className={`w-full h-full object-contain transition-all duration-300 ${
                  isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onLoad={handleImageLoad}
              />

              <button
                onClick={handlePrevious}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-200 opacity-70 hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-200 opacity-70 hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>

            <div
              ref={thumbnailsRef}
              className="mt-4 md:mt-8 max-w-[920px] w-full overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{ 
                padding: '10px 20px', // Reduced padding for mobile
                position: 'relative',
                zIndex: 10 
              }}
            >
              <div
                style={{
                  width: `${virtualizer.getTotalSize()}px`,
                  height: '77px', // Reduced height for mobile
                  position: 'relative',
                  margin: '0 auto',
                }}
              >
                {virtualizer.getVirtualItems().map(virtualItem => {
                  const photo = photos[virtualItem.index];
                  if (!photo) return null;
                  
                  return (
                    <div
                      key={photo.id}
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: 0,
                        width: '60px', // Smaller thumbnails on mobile
                        height: '60px',
                        transform: `translateX(${virtualItem.start}px)`,
                      }}
                      className={`
                        relative
                        cursor-pointer 
                        transition-all 
                        duration-200 
                        rounded-lg 
                        overflow-hidden
                        ${
                          currentIndex === virtualItem.index
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-black shadow-xl scale-105'
                            : 'border-2 border-[#E0E0E0] opacity-50 hover:opacity-80'
                        }
                        hover:shadow-lg
                        hover:scale-105
                        hover:border-white/50
                        min-w-[44px]
                        min-h-[44px]
                      `}
                      onClick={() => {
                        setCurrentIndex(virtualItem.index);
                        setAutoplayEnabled(false);
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={`Thumbnail ${virtualItem.index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons at the bottom */}
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/productscollection">
                <button className="w-full sm:w-auto px-6 md:px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200 min-h-[44px]">
                  View all
                </button>
              </Link>

              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    onClose();
                    triggerFooterContact();
                  }, 300); // Wait for fade out animation
                }}
                className="w-full sm:w-auto px-6 md:px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200 min-h-[44px]"
              >
                Contact us
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ImageGallery;