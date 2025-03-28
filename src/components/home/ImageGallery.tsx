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
    estimateSize: () => 77, // Reduced from 97 to bring thumbnails closer together
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

        function normalizeRoom(room: string): string {
          // Special case for "Light" which is considered a room
          if (room.trim().toLowerCase() === "light") return "Light";
          
          let lower = room.trim().toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        }
        
        function normalizeStyle(style: string): string {
          // Handle empty or "NONE" style cases
          if (!style || style.trim().toLowerCase() === "none") return "NONE";
          
          if (style.trim().toLowerCase() === "art_deco") return "Art_Deco"; // Special case
          return style
            .trim()
            .toLowerCase()
            .split(/\s+/) // Split by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join("_"); // Join with underscores
        }

      // ✅ Always treat the first argument as the Room, second as the Style
      const normalizedRoom = normalizeRoom(category);
      const normalizedStyle = normalizeStyle(style);

      console.log("Normalized Room:", normalizedRoom);
      console.log("Normalized Style:", normalizedStyle);

      let filterByFormula = "";
      if (normalizedStyle === "NONE") {
        // Only filter by Room
        filterByFormula = `{Room} = '${normalizedRoom}'`;
      } else {
        // Filter by both
        filterByFormula = `AND({Room} = '${normalizedRoom}', {Style} = '${normalizedStyle}')`;
      }

      const records = await base("database")
        .select({ filterByFormula })
        .all();

      console.log("Number of records found:", records.length);
      if (records.length === 0) {
        throw new Error("No images found for this category and style.");
      }

      const fetchedPhotos = records.map(record => {
        const publicId = record.fields["Cloudinary URL"] as string;
        let imageUrl = "";
      
        // Log the raw publicId for debugging
        console.log("Raw publicId from Airtable:", publicId);
      
        if (publicId.startsWith("https://")) {
          // It's already a full URL
          imageUrl = publicId.endsWith(".avif") ? publicId : `${publicId}.avif`;
        } else if (publicId.includes("v1")) {
          // It contains a version number but isn't a full URL
          imageUrl = `https://res.cloudinary.com/designcenter/image/upload/${publicId}.avif`;
        } else {
          // No version number, add it directly to base URL
          imageUrl = `https://res.cloudinary.com/designcenter/image/upload/${publicId}.avif`;
        }
      
        // Log the computed URL
        console.log(`Record ID: ${record.id} | Computed imageUrl: ${imageUrl}`);
      
        return {
          id: record.id,
          url: imageUrl,
          category: record.fields["Room"] as string,
          style: record.fields["Style"] as string || "NONE", // Default to "NONE" if style is missing
        };
      });

      setPhotos(fetchedPhotos);

      // Preload the first image
      if (fetchedPhotos.length > 0) {
        await preloadImage(fetchedPhotos[0].url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
      console.error("Error fetching photos:", err);
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

  const handlePrevious = useCallback(() => {
    if (photos.length > 0) {
      setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
      setAutoplayEnabled(false);
    }
  }, [photos.length]);

  const handleNext = useCallback(() => {
    if (photos.length > 0) {
      setCurrentIndex(prev => (prev + 1) % photos.length);
      setAutoplayEnabled(false);
    }
  }, [photos.length]);

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
  }, [onClose, handlePrevious, handleNext]);

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
        className={`h-full flex flex-col justify-center items-center pt-0 pb-8 px-4 md:px-8 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-4'
        } ${window.innerHeight <= 690 && window.innerWidth >= 790 ? 'landscape:pt-0 landscape:pb-4' : ''}
        ${window.innerHeight <= 430 ? 'landscape:pt-2 landscape:pb-2 landscape:gap-1' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
        ) : photos.length > 0 && currentPhoto ? (
          <>
            <div className="relative w-full max-w-[2000px] bg-black/30 rounded-lg group
              h-[400px] md:h-[600px] lg:h-[680px] xl:h-[750px]
              landscape:h-[85vh] landscape:max-h-[600px]
              landscape:min-h-[300px]
              ${window.innerHeight <= 430 ? 'landscape:h-[55vh] landscape:min-h-[250px]' : ''}">
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
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-200 opacity-70 hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center
                  ${window.innerHeight <= 430 ? 'p-2' : ''}"
                aria-label="Previous image"
              >
                <ChevronLeft className={`w-5 h-5 md:w-6 md:h-6 text-white ${window.innerHeight <= 430 ? 'w-4 h-4' : ''}`} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-200 opacity-70 hover:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center
                  ${window.innerHeight <= 430 ? 'p-2' : ''}"
                aria-label="Next image"
              >
                <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 text-white ${window.innerHeight <= 430 ? 'w-4 h-4' : ''}`} />
              </button>
            </div>

            {/* Restructure layout for very short screens */}
            <div className={`w-full max-w-[1100px] flex ${window.innerHeight <= 430 ? 'flex-row justify-between items-center gap-2 mt-1' : 'flex-col'}`}>
              {/* Thumbnails */}
              <div
                ref={thumbnailsRef}
                className={`
                  ${window.innerHeight <= 430 ? 'flex-1 mt-1' : 'mt-2 md:mt-3 max-w-[1100px] w-full'}
                  overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory
                  landscape:mt-1
                  ${window.innerHeight <= 430 ? 'landscape:mt-0.5 landscape:pb-0.5' : ''}
                `}
                style={{ 
                  padding: '4px 10px', // Further reduced padding for closer thumbnails
                  position: 'relative',
                  zIndex: 10,
                  ...(window.innerHeight <= 690 && window.innerWidth >= 790 ? {
                    padding: '2px 8px', // Minimal padding for landscape
                  } : {}),
                  ...(window.innerHeight <= 430 ? {
                    padding: '1px 2px', // Even smaller padding for very short screens
                  } : {})
                }}
              >
                <div
                  style={{
                    width: `${virtualizer.getTotalSize()}px`,
                    height: '50px', // Further reduced from 65px
                    position: 'relative',
                    margin: '0 auto',
                    ...(window.innerHeight <= 690 && window.innerWidth >= 790 ? {
                      height: '40px', // Reduced from 50px
                    } : {}),
                    ...(window.innerHeight <= 430 ? {
                      height: '36px', // Reduced from 34px
                    } : {})
                  }}
                >
                  {virtualizer.getVirtualItems().map(virtualItem => {
                    const photo = photos[virtualItem.index];
                    if (!photo) return null;

                    let thumbnailSize = '42px'; // Reduced from 48px
                    if (window.innerHeight <= 430) {
                      thumbnailSize = '22px'; // Reduced from 30px
                    } else if (window.innerHeight <= 690 && window.innerWidth >= 790) {
                      thumbnailSize = '34px'; // Reduced from 40px
                    }

                    return (
                      <div
                        key={photo.id}
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: 0,
                          width: thumbnailSize,
                          height: thumbnailSize,
                          transform: `translateX(${virtualItem.start}px)`,
                          marginRight: '3px', // Reduced from 5px for tighter spacing
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
                              ? 'ring-2 ring-black ring-offset-1 ring-offset-black shadow-xl scale-105'
                              : 'border border-[#E0E0E0] opacity-50 hover:opacity-90'
                          }
                          hover:shadow-lg
                          hover:scale-105
                          hover:border-white/50
                          min-w-[36px]
                          min-h-[36px]
                          ${window.innerHeight <= 430 ? 'ring-offset-1 border-1' : 'ring-offset-2 border-2'}
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

              {/* Buttons - moved to the side for very short screens */}
              <div className={`
                ${window.innerHeight <= 430 
                  ? 'flex-shrink-0 flex flex-row items-center gap-2 mt-0' 
                  : 'mt-3 md:mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 landscape:mt-1'}
              `}>
                <Link to="/productscollection">
                  <button className={`
                    w-full sm:w-auto bg-[#B49157] text-white uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200 min-h-[44px]
                    ${window.innerHeight <= 430 
                      ? 'px-3 py-1 text-[10px] rounded' 
                      : 'px-6 md:px-8 py-3 text-sm landscape:py-2 landscape:text-xs'}
                  `}>
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
                  className={`
                    w-full sm:w-auto bg-[#B49157] text-white uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200 min-h-[44px]
                    ${window.innerHeight <= 430 
                      ? 'px-3 py-1 text-[10px] rounded' 
                      : 'px-6 md:px-8 py-3 text-sm landscape:py-2 landscape:text-xs'}
                  `}
                >
                  Contact us
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ImageGallery;