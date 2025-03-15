import { FeatureSteps } from "../ui/feature-section";
import { useEffect } from 'react';
// import { Link } from "react-router-dom";

const features = [
  { 
    step: 'Step 1', 
    title: 'DISCOVER YOUR STYLE',
    content: 'Share your vision with our expert designers, and we will craft a personalized plan that blends elegance with functionality.', 
    image: 'https://www.visionnaire-home.com/sites/default/files/styles/side_by_side/public/stories/images/2014.jpg?itok=nO2YS8_4' 
  },
  { 
    step: 'Step 2',
    title: 'PRECISION IN EXECUTION',
    content: 'We source the finest materials and manage every detail, ensuring a seamless, stress-free process from concept to completion.',
    image: 'https://www.visionnaire-home.com/sites/default/files/styles/hero_image/public/hero-images/Visionnaire_Craftsmanship_01.jpg'
  },
  { 
    step: 'Step 3',
    title: 'LIVE IN LUXURY',
    content: 'Experience a home designed for lasting beauty, comfort, and sophistication—tailored exclusively to you.',
    image: 'https://catalogue.visionnaire-home.com/sites/default/files/styles/max_2600x2600/public/spaces/featured/Beloved2017_bedroom_01.jpg?itok=1caoiCiw&_gl=1*11htufj*_up*MQ..*_ga*NjI3NDIwNjgwLjE3NDA2ODg1ODY.*_ga_4D36DB6FV2*MTc0MDY4ODU4Ni4xLjEuMTc0MDY4OTI2My4wLjAuMA..'
  },
];

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

export function FeatureStepsDemo() {

  return (
    <div className="relative bg-[#1A1A1A] py-16 sm:py-24">
      <FeatureSteps 
        features={features}
        title="COME WITH AN IDEA"
        autoPlayInterval={4000}
        imageHeight="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]" // Adjusted heights for better mobile view
        className="relative z-20"
      />
      
      <div className="mt-8 flex justify-center relative z-30">
        <button 
          onClick={triggerFooterContact} 
          className="w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
        >
          CONTACT US
        </button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10" />
    </div>
  );
}