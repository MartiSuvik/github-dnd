import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  triggerFooterContact: () => void;
  scrollToProjects: () => void;
}

const SustainabilityCTA: React.FC<CallToActionProps> = ({  }) => {
  // Implement the proper footer contact trigger functionality
  const handleConsultationClick = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth',
      });

      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#272727] to-[#545454]">
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <h2 className="text-5xl font-serif mb-4 bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent">
          Transform Your Vision Into Reality
        </h2>
        <p className="text-xl text-white/60 mb-12">
          Book Your Complimentary Consultation
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={handleConsultationClick} 
            className="w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
          >
            CONTACT US
          </button>
          <Link 
            to="/productscollection" 
            className="w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]"
          >
            VIEW COLLECTIONS
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCTA;