import { FeatureSteps } from "../ui/feature-section"

const features = [
  { 
    step: 'Step 1', 
    title: 'Discover Your Style',
    content: 'Share your vision with our expert designers, and we’ll craft a personalized plan that blends elegance with functionality.', 
    image: 'https://res.cloudinary.com/designcenter/image/upload/Your_Vision_Made_Design.avif' 
  },
  { 
    step: 'Step 2',
    title: 'Precision in Execution',
    content: 'We source the finest materials and manage every detail, ensuring a seamless, stress-free process from concept to completion.',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Made_With_Italian_Craftsmanship.avif'
  },
  { 
    step: 'Step 3',
    title: 'Live in Luxury',
    content: 'Experience a home designed for lasting beauty, comfort, and sophistication—tailored exclusively to you.',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Completed_Luxury_Bedroom_Set.avif'
  },
]

const triggerFooterContact = () => {
  console.log('Button clicked'); // Debug log
  const footerElement = document.querySelector('#footer');
  console.log('Footer element:', footerElement); // Debug log
  
  if (footerElement instanceof HTMLElement) {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: scrollHeight - windowHeight,
      behavior: 'smooth',
    });

    setTimeout(() => {
      const footerContactBtn = document.querySelector('[data-footer-contact]');
      console.log('Footer contact button:', footerContactBtn); // Debug log
      if (footerContactBtn instanceof HTMLButtonElement) {
        footerContactBtn.click();
      }
    }, 800);
  }
};

export function ProductCollectionSteps() {
  return (
    <>
      <FeatureSteps 
        features={features}
        title="COME WITH AN IDEA"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
        titleClassName="text-black"
      />
      <div className="mt-8 flex justify-center">
        <button 
          onClick={triggerFooterContact} 
          className="w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
        >
          CONTACT US
        </button>
      </div>
    </>
  );
}