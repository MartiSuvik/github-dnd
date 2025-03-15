import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // <-- Add Helmet import
import ScrollToTop from './components/ui/ScrollToTop';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import Sustainability from './pages/Sustainability';
import HowWeWork from './pages/HowWeWork';
import ProductsCollection from './pages/ProductsCollection';
import Collaboration from './pages/collaboration';
import Blog from './pages/Blog';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Inject Global Structured Data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      "name": "D&D Design Center",
      "url": "https://www.dddesigncenter.com",
      "logo": "https://res.cloudinary.com/designcenter/image/upload/D_D_Logo.avif",
      "image": "https://res.cloudinary.com/designcenter/image/upload/D_D_New_York_Showroom.avif",
      "description": "Luxury bespoke furniture solutions serving clients across the United States, specializing in high-end interiors and custom furniture.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brooklyn",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "telephone": "+1 718-934-7100",
      "serviceArea": [
        { "@type": "AdministrativeArea", "name": "United States" },
        { "@type": "AdministrativeArea", "name": "New York" },
        { "@type": "AdministrativeArea", "name": "New Jersey" },
        { "@type": "AdministrativeArea", "name": "Florida" },
        { "@type": "AdministrativeArea", "name": "Ohio" }
      ],
      "sameAs": [
        "https://www.instagram.com/dnddesigncenter/",
        "https://www.facebook.com/dnddesigncenter"
      ]
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup on unmount
    };
  }, []);

  const triggerFooterContact = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const footerContactBtn = document.querySelector(
          '[data-footer-contact]'
        ) as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <>
      <Helmet>
        {/* ✅ SEO Meta Tags */}
        <title>D&D Design Center | Luxury Custom Furniture Across America</title>
        <meta
          name="description"
          content="D&D Design Center offers luxury custom furniture and high-end interior designs across the United States, with a focus on craftsmanship and elegance."
        />
        <meta name="keywords" content="luxury interiors, custom furniture, high-end design, bespoke furniture, modern home decor, interior design USA" />
        <meta name="author" content="D&D Design Center" />
        <meta name="robots" content="index, follow" />

        {/* ✅ Open Graph Meta Tags (For Social Media) */}
        <meta property="og:title" content="D&D Design Center | Luxury Custom Furniture Across America" />
        <meta property="og:description" content="Luxury custom furniture and high-end interior designs, serving clients across the United States with a focus on craftsmanship and elegance." />
        <meta property="og:image" content="https://res.cloudinary.com/designcenter/image/upload/D_D_New_York_Showroom.avif" />
        <meta property="og:url" content="https://www.dddesigncenter.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* ✅ Favicon */}
        <link rel="icon" href="https://res.cloudinary.com/designcenter/image/upload/favicon.ico" />
      </Helmet>

      <Router>
        <ScrollToTop />
        <Navbar
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          triggerFooterContact={triggerFooterContact}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/productscollection" element={<ProductsCollection />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;