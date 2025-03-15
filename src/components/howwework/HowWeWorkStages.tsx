import { useState, useEffect } from 'react';
import Footer from '../ui/Footer';
import { ThreeDCardSliderDemo } from './ThreeDCardSliderDemo';

const ThreeDCardDemo = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => window.scrollY > 50;
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <main className={isMobile ? 'pt-0' : 'pt-0'}>
        <ThreeDCardSliderDemo />
      </main>
      <Footer />
    </div>
  );
};

export default ThreeDCardDemo;
