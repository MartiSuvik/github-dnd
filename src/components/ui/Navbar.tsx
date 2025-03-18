import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  triggerFooterContact: () => void;
  isFooterExpanded?: boolean; // Add this new prop
}

interface MenuItem {
  title: string;
  href: string;
  image?: string;
  alt?: string; // added for SEO
}

const menuItems: MenuItem[] = [
  {
    title: 'HOME',
    href: '/',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Italian%20Interiors%20%E2%80%93%20DnD%20Design%20Center.avif',
    alt: 'Luxury Italian Interiors – D&D Design Center',
  },
  {
    title: 'PRODUCTS',
    href: '/productscollection',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Product%20Collection%20%E2%80%93%20DnD%20Design%20Center.avif',
    alt: 'Luxury Product Collection – D&D Design Center',
  },
  {
    title: 'HOW WE WORK',
    href: '/how-we-work',
    image: 'https://res.cloudinary.com/designcenter/image/upload/How%20We%20Design%20%E2%80%93%20DnD%20Design%20Center.avif',
    alt: 'How We Design – D&D Design Center',
  },
  {
    title: 'SUSTAINABILITY',
    href: '/sustainability',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Sustainable%20Luxury%20Design%20%E2%80%93%20DnD%20Design%20Center.avif',
    alt: 'Sustainable Luxury Design – D&D Design Center',
  },
  {
    title: 'COLLABORATION',
    href: '/collaboration',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Visionnaire%20Collaboration%20%E2%80%93%20Luxury%20Interiors.avif',
    alt: 'Visionnaire Collaboration – Luxury Interiors',
  },
  {
    title: 'BLOG',
    href: '/blog',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Interior%20Design%20Blog%20%E2%80%93%20DnD%20Design%20Center.avif',
    alt: 'Luxury Interior Design Blog – D&D Design Center',
  },
  {
    title: 'CONTACT',
    // Using '#' to prevent navigation, allowing the onClick handler to trigger triggerFooterContact
    href: '#',
    image: 'https://res.cloudinary.com/designcenter/image/upload/Contact%20Us%20%E2%80%93%20DnD%20Design%20Center.avif',
    alt: 'Contact Us – D&D Design Center',
  },
];

const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  triggerFooterContact,
  isFooterExpanded = false, // Default to false
}) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const savedMute = localStorage.getItem('audioMuted');
    return savedMute ? JSON.parse(savedMute) : false;
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect screen height for layout switching
  useEffect(() => {
    const checkScreenSize = () => {
      setIsCompactMode(window.innerHeight < 630);
    };
    
    // Run on mount and when window resizes
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Start at 40% volume
      audioRef.current.muted = isMuted; // Apply saved mute state
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        document.addEventListener('click', () => {
          audioRef.current?.play();
        }, { once: true });
      });
    }
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleClose = () => {
    setIsMenuOpen(false);
    setIsHovered(false);
    setActiveItem(null);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      localStorage.setItem('audioMuted', JSON.stringify(audioRef.current.muted));
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        autoPlay 
        muted={isMuted}
      >
        <source 
          src="https://res.cloudinary.com/designcenter/video/upload/Long_Version_Mix_3.mp3" 
          type="audio/mpeg" 
        />
      </audio>
      
      <nav
        className={`fixed w-full z-50 transition-all duration-300 transform ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        } ${isMenuOpen || isFooterExpanded ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/designcenter/image/upload/DnD_Logo_Transparent.svg"
                alt="D&D Design Center"
                className={`h-14 md:h-14 transition-all duration-300 ${
                  isScrolled ? 'brightness-0' : 'brightness-0 invert'
                }`}
              />
            </Link>

            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="md:hidden flex items-center space-x-3">
                <a 
                  href="tel:+17189347100" 
                  className="flex items-center justify-center w-10 h-10 text-white bg-[#C5A267] rounded-full"
                  aria-label="Call us"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              <button
                onClick={toggleMute}
                className={`flex items-center justify-center w-10 h-10 ${
                  isScrolled ? 'text-white' : 'text-white'
                } hover:scale-110 transition-all duration-300 bg-[#C5A267] md:bg-transparent rounded-full`}
                aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>

              <span
                className={`hidden md:inline-block sm:text-3xl font-serif ${
                  isScrolled ? 'text-[#2D2D2D]' : 'text-white'
                }`}
              >
                MENU
              </span>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-1 rounded-md transition-all duration-1000 ${
                  isScrolled ? 'text-[#2D2D2D]' : 'text-white'
                } hover:scale-110 min-w-[44px] min-h-[44px]`}
                aria-label="Menu"
              >
                <Menu className="w-12 h-12 md:w-12 md:h-12" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-1000 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      >
        <div
          className={`fixed top-0 right-0 h-screen w-full md:w-auto flex transform transition-transform duration-1000 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-[#2D2D2D] hover:scale-110 transition-transform duration-1000 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
              isHovered ? 'w-0 md:w-[500px]' : 'w-0'
            }`}
          >
            {menuItems.map((item, index) => (
              <div
                key={item.title}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeItem === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image ?? ''})` }}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>

          <div className={`
            w-full md:w-[300px] bg-white flex flex-col h-full overflow-y-auto
            ${isCompactMode ? "responsive-nav-menu" : ""}
          `}>
            <div className={`flex justify-center items-center ${isCompactMode ? "pt-12 pb-3" : "pt-12 pb-8"} px-6 md:px-12`}>
              <img
                src="https://res.cloudinary.com/designcenter/image/upload/DnD_Logo_Transparent.svg"
                alt="D&D Design Center"
                className={`navbar-logo brightness-0 ${isCompactMode ? "h-12 w-auto" : "w-40 md:w-40"}`}
              />
            </div>

            <div className="flex-1 px-6 pb-8 md:px-12 relative">
              <div className="relative">
                <nav className={`items-start relative z-10 ${
                  isCompactMode 
                    ? "grid grid-cols-2 gap-x-4 gap-y-3" 
                    : "flex flex-col space-y-6 md:space-y-4"
                }`}>
                  {menuItems.map((item, index) => {
                    const handleItemClick = () => {
                      handleClose();
                      if (item.title === 'CONTACT') {
                        triggerFooterContact();
                      }
                    };

                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        className={`
                          text-left text-[16px] md:text-[20px] font-serif text-[#2D2D2D] 
                          hover:text-[#C5A267] transition-colors duration-200 min-h-[44px] 
                          flex items-center relative pl-6
                          ${isCompactMode ? "nav-item-compact" : ""}
                        `}
                        onClick={handleItemClick}
                        onMouseEnter={() => {
                          setActiveItem(index);
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                        }}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;