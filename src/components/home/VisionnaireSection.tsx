import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Array of luxury furniture images with SEO-friendly Cloudinary URLs & metadata
const luxuryImages = [
  {
    url: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20NYC%20%E2%80%93%20Custom%20Bespoke%20Furniture.avif",
    alt: "Luxury bespoke living room with custom-designed sofa and panoramic city views in New York.",
    title: "Luxury Living Room Design NYC – Custom Bespoke Furniture",
  },
  {
    url: "https://res.cloudinary.com/designcenter/image/upload/Custom%20White%20Leather%20Sofas%20and%20Modern%20Coffee%20Table%20%E2%80%93%20NYC%20Interior%20Design.avif",
    alt: "Bright and modern living space featuring handcrafted white leather sofas and glass coffee table, inspired by Design Within Reach.",
    title: "Custom White Leather Sofas & Modern Coffee Table – NYC Interior Design",
  },
  {
    url: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Custom%20Furniture%20for%20Modern%20Homes%20%E2%80%93%20Bespoke%20Interiors%20NYC.avif",
    alt: "Contemporary open-concept living room with custom sofas and luxury lighting, perfect for high-end homes in Florida and New York.",
    title: "Luxury Custom Furniture for Modern Homes – Bespoke Interiors NYC",
  },
  {
    url: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Lounge%20and%20Bespoke%20Furniture%20Design%20%E2%80%93%20High-End%20Interiors%20NYC.avif",
    alt: "Sophisticated luxury lounge space with handcrafted wooden coffee table and velvet seating, inspired by Restoration Hardware.",
    title: "Luxury Lounge & Bespoke Furniture Design – High-End Interiors NYC",
  }
];

const VisionnaireSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Text animations
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });

      textTl
        .fromTo(titleRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
        .fromTo(taglineRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
        .fromTo(textRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

      // Scroll-based image change
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const newIndex = Math.min(
            luxuryImages.length - 1,
            Math.floor(self.progress * luxuryImages.length)
          );
          if (newIndex !== currentImageIndex) {
            setCurrentImageIndex(newIndex);
          }
        }
      });

      // Parallax effect on images
      gsap.fromTo(imageRef.current, { y: 0 }, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []); 

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left - Scroll-changing Image */}
          <div className="relative h-[300px] md:h-[500px] overflow-hidden order-2 md:order-1">
            <div ref={imageRef} className="absolute inset-0 w-full h-full">
              {luxuryImages.map((img, index) => (
                <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src={img.url} 
                    alt={img.alt} 
                    title={img.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Visionnaire logo overlay */}
            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-6 bg-black/50 backdrop-blur-sm p-2 md:p-3 rounded">
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/Visionnaire_Logo.svg" 
                alt="Visionnaire" 
                className="h-6 md:h-8 w-auto invert"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="text-white space-y-4 md:space-y-6 order-1 md:order-2">
            <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl font-serif">
              COLLABORATION
            </h2>
            <h3 ref={taglineRef} className="text-xl md:text-2xl font-light text-[#C5A267] italic">
              "Bespoke Design With An Italian Soul"
            </h3>
            <p ref={textRef} className="text-white/80 text-base md:text-lg leading-relaxed">
              Our exclusive partnership with Visionnaire brings the pinnacle of Italian luxury design to your doorstep. Each piece represents a harmonious blend of artistic vision and functional excellence, crafted with meticulous attention to detail and the finest materials.
            </p>
            <Link to="/collaboration" ref={ctaRef} className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A267] text-black font-medium rounded-sm hover:bg-[#D6B378] transition-colors duration-300 group min-h-[44px]">
              <span>EXPLORE VISIONNAIRE</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireSection;
