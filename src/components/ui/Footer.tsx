import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {
  ChevronUp,
  X,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollManager } from '../../hooks/useScrollManager';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FooterProps {
  id?: string;
  onExpandChange?: (expanded: boolean) => void;  // Add this new prop
}

// Extracted reusable components
const ContactForm = ({ 
  formData, 
  setFormData, 
  formStatus, 
  handleSubmit, 
  isMobile 
}: { 
  formData: FormData, 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>, 
  formStatus: 'idle' | 'success' | 'error', 
  handleSubmit: (e: React.FormEvent) => Promise<void>,
  isMobile: boolean
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-900">
      Get in Touch
    </h3>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C5A267] focus:border-[#C5A267] transition-shadow duration-200 ${isMobile ? 'text-base' : 'text-sm'}`}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C5A267] focus:border-[#C5A267] transition-shadow duration-200 ${isMobile ? 'text-base' : 'text-sm'}`}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              message: e.target.value,
            }))
          }
          rows={isMobile ? 3 : 4}
          className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C5A267] focus:border-[#C5A267] transition-shadow duration-200 resize-none ${isMobile ? 'text-base' : 'text-sm'}`}
          required
          aria-required="true"
        />
      </div>
      <button
        type="submit"
        disabled={formStatus === 'success'}
        className={`w-full py-3 px-4 rounded-lg text-white ${isMobile ? 'text-base' : 'text-sm'} font-medium transition-all duration-200 min-h-[44px] ${
          formStatus === 'success'
            ? 'bg-green-500'
            : formStatus === 'error'
            ? 'bg-red-500'
            : 'bg-[#C5A267] hover:bg-[#B49157]'
        }`}
      >
        {formStatus === 'success'
          ? 'Message Sent!'
          : formStatus === 'error'
          ? 'Try Again'
          : 'Send Message'}
      </button>
    </form>
  </div>
);

const ContactInfo = ({ isMobile }: { isMobile: boolean }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-medium text-gray-900">
      Contact Information
    </h3>
    <div className="space-y-3">
      <a
        href="tel:+17189347100"
        className={`flex items-center space-x-3 ${isMobile ? 'text-base' : 'text-sm'} text-gray-600 min-h-[44px]`}
      >
        <Phone className="w-4 h-4 text-[#C5A267] flex-shrink-0" />
        <span>(718) 934-7100</span>
      </a>
      <a
        href="mailto:info@dnddesigncenter.com"
        className={`flex items-center space-x-3 ${isMobile ? 'text-base' : 'text-sm'} text-gray-600 min-h-[44px]`}
      >
        <Mail className="w-4 h-4 text-[#C5A267] flex-shrink-0" />
        <span>info@dnddesigncenter.com</span>
      </a>
      <div className={`flex items-center space-x-3 ${isMobile ? 'text-base' : 'text-sm'} text-gray-600`}>
        <MapPin className="w-4 h-4 text-[#C5A267] flex-shrink-0" />
        <span>
          2615 East 17th Street Brooklyn, New York 11235, USA
        </span>
      </div>
    </div>
  </div>
);

const NavigationLinks = ({ isMobile, setIsExpanded }: { isMobile: boolean, setIsExpanded: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/productscollection", label: "Product Collection" },
    { to: "/collaboration", label: "Collaboration" },
    { to: "/sustainability", label: "Sustainability" },
    { to: "/how-we-work", label: "How We Work" },
    { to: "/blog", label: "Blog" }
  ];

  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer min-h-[44px]">
            <h3 className="text-lg font-medium text-gray-900">
              Navigation
            </h3>
            <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" />
          </summary>
          <nav className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-left text-base text-gray-600 hover:text-[#C5A267] transition-colors duration-200 min-h-[44px] flex items-center"
                onClick={() => setIsExpanded(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Navigation
      </h3>
      <nav className="grid grid-cols-2 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="text-left text-sm text-gray-600 hover:text-[#C5A267] transition-colors duration-200"
            onClick={() => setIsExpanded(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const MapComponent = ({ isMobile, isExpanded }: { isMobile: boolean, isExpanded: boolean }) => {
  if (!isExpanded) return null;
  
  return (
    <div className={`${isMobile ? "space-y-2" : "h-[300px] rounded-lg overflow-hidden"}`}>
      {isMobile && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Location</h3>
          <a
            href="https://maps.google.com/?q=2615+East+17th+Street+Brooklyn,+New+York+11235,+USA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5A267] text-sm flex items-center gap-1"
          >
            View on Google Maps <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
      <div className={`${isMobile ? "h-[200px] md:h-[250px]" : "h-[300px]"} rounded-lg overflow-hidden`}>
        <iframe
          title="D&D Design Center Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBLSNeo65Xg4Imwlxq-2GGCARWAIjVk5Ek&q=2615 East 17th Street, Brooklyn, New York 11235, USA&zoom=15`}
          allowFullScreen
        />
      </div>
    </div>
  );
};

const Footer = forwardRef<HTMLElement, FooterProps>(({ onExpandChange }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const expandedContentRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<number>();
  const scrollManager = useScrollManager();

  // Detect mobile vs. desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      // Adjust this breakpoint as needed
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll events with debouncing
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }

      scrollTimeout.current = window.requestAnimationFrame(() => {
        if (scrollManager.isScrollLocked()) return;

        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isNearBottom =
          currentScrollY + windowHeight > documentHeight - 100;

        if (isNearBottom) {
          setIsVisible(true);
        } else if (!isExpanded) {
          setIsVisible(false);
        }

        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }
    };
  }, [scrollManager, isExpanded]);

  // Handle expansion animation
  useEffect(() => {
    if (!expandedContentRef.current) return;

    const content = expandedContentRef.current;
    content.style.display = 'block';

    if (isExpanded) {
      // For mobile and tablet: limit max height and allow scrolling
      if (isMobile || (window.innerWidth >= 768 && window.innerWidth <= 992)) {
        content.style.maxHeight = '70vh'; // Change from height to maxHeight
        content.style.height = 'auto';    // Allow content to determine height
        content.style.overflowY = 'auto'; // Enable scrolling
      } else {
        const height = content.scrollHeight;
        content.style.height = '0';
        // Force reflow
        content.offsetHeight;
        content.style.height = `${height}px`;
      }
      content.style.opacity = '1';
      setIsVisible(true);
      
      // Ensure smooth scrolling behavior
      content.style.scrollBehavior = 'smooth';
    } else {
      if (isMobile || (window.innerWidth >= 768 && window.innerWidth <= 992)) {
        content.style.maxHeight = '0';
        content.style.height = '0';
      } else {
        content.style.height = `${content.scrollHeight}px`;
        // Force reflow
        content.offsetHeight;
        content.style.height = '0';
      }
      content.style.opacity = '0';
    }
  }, [isExpanded, isMobile]);

  // Handle transition end
  useEffect(() => {
    const content = expandedContentRef.current;
    if (!content) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      // We only care about height or opacity transitions
      if (e.propertyName !== 'height' && e.propertyName !== 'opacity') return;

      if (!isExpanded) {
        content.style.display = 'none';
        // Hide footer if not near bottom
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isNearBottom =
          window.scrollY + windowHeight > documentHeight - 100;
        if (!isNearBottom) {
          setIsVisible(false);
        }
      } else if (!isMobile && window.innerWidth > 992) {
        // Let desktop expand fully only if wider than 992
        content.style.height = 'auto';
      }
    };

    content.addEventListener('transitionend', handleTransitionEnd);
    return () =>
      content.removeEventListener('transitionend', handleTransitionEnd);
  }, [isExpanded, isMobile]);

  // Notify parent component when expand state changes
  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://hook.us2.make.com/c4yxbfemmbazew2y219wu0m11wtp9unn',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormStatus('success');

      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('idle');
        setIsExpanded(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <footer
      id="footer"
      ref={ref}
      className={`fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm shadow-lg transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } transition-transform duration-300 ease-out will-change-transform`}
      style={{ zIndex: 30 }}
    >
      {/* Minimized Footer (both mobile & desktop) */}
      <div
        className={`max-w-[1200px] mx-auto ${
          isMobile ? 'px-4 py-3' : 'px-6 py-4'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-block transition-transform duration-200 hover:scale-105"
            aria-label="D&D Design Center - Homepage"
          >
            <img
              src="https://res.cloudinary.com/designcenter/image/upload/DnD_Logo_Transparent.svg"
              alt="D&D Design Center"
              className={`w-auto object-contain ${
                isMobile
                  ? 'h-[40px] md:h-[60px] max-w-[100px] md:max-w-[120px]'
                  : 'h-[60px] max-w-[120px]'
              }`}
            />
          </Link>

          <div className={`flex items-center ${isMobile ? 'space-x-3' : 'space-x-6'}`}>
            <button
              onClick={() => {
                const newExpandedState = !isExpanded;
                setIsExpanded(newExpandedState);
                setIsVisible(true);
                onExpandChange?.(newExpandedState);
              }}
              data-footer-contact
              className={`flex items-center space-x-2 font-sans rounded-lg transition-all duration-200 min-h-[44px] ${
                isMobile
                  ? 'px-4 md:px-6 py-2 bg-[#C5A267] hover:bg-[#B49157] text-white text-sm'
                  : 'px-6 py-2 bg-[#C5A267] hover:bg-[#B49157] text-white text-sm'
              }`}
            >
              <span>CONTACT</span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>

            {/* Back To Top only visible on desktop */}
            {!isMobile && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hidden md:flex items-center space-x-2 font-sans text-sm text-gray-600 hover:text-black transition-colors duration-200 group min-h-[44px]"
              >
                <span>BACK TO TOP</span>
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Footer */}
      <div
        ref={expandedContentRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          height: 0,
          opacity: 0,
          backgroundColor: '#fafafa',
          willChange: 'height, opacity',
          WebkitOverflowScrolling: 'touch', // For momentum scrolling on iOS
        }}
      >
        <div
          className={`max-w-[1200px] mx-auto ${
            isMobile ? 'px-4 md:px-6 py-6 md:py-8' : 'px-6 py-8'
          } ${isMobile ? 'pb-16' : ''}`} // Add bottom padding on mobile to ensure content is visible when scrolled
        >
          {isMobile ? (
            <div className="grid grid-cols-1 gap-6">
              {/* Contact Form */}
              <ContactForm 
                formData={formData} 
                setFormData={setFormData} 
                formStatus={formStatus} 
                handleSubmit={handleSubmit} 
                isMobile={isMobile}
              />

              {/* Contact Information */}
              <ContactInfo isMobile={isMobile} />

              {/* Navigation Links */}
              <NavigationLinks isMobile={isMobile} setIsExpanded={setIsExpanded} />

              {/* Map */}
              <MapComponent isMobile={isMobile} isExpanded={isExpanded} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <ContactForm 
                formData={formData} 
                setFormData={setFormData} 
                formStatus={formStatus} 
                handleSubmit={handleSubmit} 
                isMobile={isMobile}
              />

              {/* Navigation + Contact Info */}
              <div className="space-y-6">
                <NavigationLinks isMobile={isMobile} setIsExpanded={setIsExpanded} />
                <ContactInfo isMobile={isMobile} />
              </div>

              {/* Map */}
              <MapComponent isMobile={isMobile} isExpanded={isExpanded} />
            </div>
          )}

          {/* Footer bottom row */}
          <div className={`${isMobile ? 'mt-6 md:mt-8 pt-4 md:pt-6 sticky bottom-0 bg-[#fafafa] py-2' : 'mt-8 pt-6'} border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} D&D Design Center. All rights
              reserved.
            </p>
            <button
              onClick={() => {
                setIsExpanded(false);
                onExpandChange?.(false);
              }}
              className={`text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2 ${isMobile ? 'min-h-[44px]' : ''}`}
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
