import { useEffect, useState } from "react";
import { GridMotion } from "../ui/grid-motion";

export function GridMotionDemo() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Reduce number of items for mobile
  const getItems = () => {
    // Base images array - all the images
    const baseItems = [
      // Images 1-4
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/accessories.jpg?h=62c681c6&itok=X4979buy",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/wardrobes.jpg?h=62c681c6&itok=9VHYWLPP",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/07%20Audabe_1750.jpg?h=a9c9f155&itok=qBTzQxgc",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/consolle_0.jpg?h=201e2d68&itok=e1fvz8eI",
      // Quote 1
      "Design Shapes The Future",
      // Images 5-8
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/Visionnaire_Duncan%20Wall_01.jpg?h=5eef411c&itok=fVXEXdlw",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/carpets.jpg?h=62c681c6&itok=ZZKdfPrK",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/bookshelves_0.jpg?h=0905083a&itok=8Nx2Ergg",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/lights.jpg?h=62c681c6&itok=RkEzzq5W",
      // Quote 2
      "Design and Designers move outside the traditional boundaries.",
      // Images 9-12
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/wellness_0.jpg?h=437756d2&itok=rTMb1dlf",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/vanity.jpg?h=62c681c6&itok=GqVAm_fJ",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/desk.jpg?h=62c681c6&itok=D8cGUBte",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/art-gallery.jpg?h=62c681c6&itok=grzcQgp7",
      // Quote 3
      "Designers have the tacit permission to play outside the box.",
      // Images 13-16
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/tables.jpg?h=eb6658bb&itok=rAscwNvz",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/Cabinets.jpg?h=201e2d68&itok=6S8WTrH9",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/Dehors.jpg?h=201e2d68&itok=AFKD9KOT",
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/benches.jpg?h=eb6658bb&itok=3pVuFHhZ",
      // Image 17
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/chaise-longues.jpg?h=d753e60c&itok=LlLbyZaM",
      // Quote 4
      "A good design acknowledges the past.",
      // Image 18
      "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/bed.jpg?h=62c681c6&itok=RnbHuWEE",
      // Quote 5
      "A good design shapes uniqueness.",
      // Quote 6
      "A good design frames future."
    ];
    
    // Return fewer items for mobile to improve performance
    if (isMobile) {
      // Return key items: 4 images, 3 quotes, 4 more images = 11 items
      return [
        baseItems[0], // Image 1
        baseItems[3], // Image 4
        baseItems[4], // Quote 1
        baseItems[5], // Image 5
        baseItems[8], // Image 8
        baseItems[9], // Quote 2
        baseItems[10], // Image 9 
        baseItems[13], // Image 12
        baseItems[14], // Quote 3
        baseItems[19], // Quote 4
        baseItems[21], // Quote 5
      ];
    }
    
    return baseItems;
  };

  return (
    <section className="relative h-screen sm:h-screen w-full bg-white font-serif overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GridMotion 
          items={getItems()}
          gradientColor="#C0A960"
          className="relative z-10"
        />
      </div>
      
      {/* Mobile overlay guidance text */}
      {isMobile && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 px-4">
          <div className="bg-white/80 backdrop-blur-sm text-center py-3 px-6 rounded-lg shadow-md">
            <p className="text-[#C0A960] text-sm">Scroll to explore our design philosophy</p>
          </div>
        </div>
      )}
    </section>
  );
}