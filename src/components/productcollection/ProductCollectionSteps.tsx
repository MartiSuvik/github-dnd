import { FeatureSteps } from "../ui/feature-section"

const features = [
  { 
    step: 'Step 1', 
    title: 'Discover Your Luxury Interior Style',
    content: 'Our experts refine your vision—whether contemporary, timeless, or uniquely bespoke. We craft a design plan tailored to your lifestyle with a seamless consultation.',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Your_Vision_Made_Design.avif',
    alt: "Luxury interior design consultation with expert designers at D&D Design Center.",
  },
  { 
    step: 'Step 2',
    title: 'Precision Craftsmanship & Italian Design',
    content: 'We collaborate with top Italian artisans to deliver flawless craftsmanship. Every piece undergoes strict quality control, ensuring durability and precision.',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Made_With_Italian_Craftsmanship.avif',
    alt: "High-end furniture craftsmanship using premium Italian materials.",
  },
  { 
    step: 'Step 3',
    title: 'Experience Timeless Elegance in Your Home',
    content: 'Luxury interiors crafted for elegance and comfort. We offer transparent pricing, flexible payment plans, and a stress-free process from design to installation.',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Completed_Luxury_Bedroom_Set.avif',
    alt: "Luxury bedroom interior with elegant furnishings and bespoke decor.",
  },
];

const triggerFooterContact = () => {
  const footerElement = document.querySelector('#footer');
  if (footerElement instanceof HTMLElement) {
    window.scrollTo({ top: document.documentElement.scrollHeight - window.innerHeight, behavior: 'smooth' });
    setTimeout(() => {
      const footerContactBtn = document.querySelector('[data-footer-contact]');
      if (footerContactBtn instanceof HTMLButtonElement) {
        footerContactBtn.click();
      }
    }, 800);
  }
};

export function ProductCollectionSteps() {
  return (
    <section aria-label="Luxury Interior Design Process" className="px-6 md:px-12 py-12 md:py-20">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
          TURN YOUR VISION INTO <span className="text-[#C5A267]">LUXURY</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto text-lg md:text-xl">
          From concept to completion, our bespoke design process ensures an exclusive, elegant, and timeless living experience.
        </p>
      </div>

      <FeatureSteps 
        features={features}
        title=""
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
        titleClassName="text-black"
      />

      <div className="mt-12 flex justify-center">
        <button 
          onClick={triggerFooterContact} 
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-all duration-300 min-h-[44px]"
          aria-label="Request a luxury design consultation"
        >
          REQUEST A CONSULTATION
        </button>
      </div>
    </section>
  );
}
