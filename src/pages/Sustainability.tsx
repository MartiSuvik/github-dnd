import { useEffect } from 'react';
import Footer from '../components/ui/Footer';
import SustainabilityHero from '../components/sustainability/SustainabilityHero';
import SustainabilityHighlights from '../components/sustainability/SustainabilityHighlights';
import SustainabilityShowcase from '../components/sustainability/SustainabilityShowcase';
import SustainabilityStats from '../components/sustainability/SustainabilityStats';
import SustainabilityPath from '../components/sustainability/SustainabilityPath';
import SustainabilityCTA from '../components/sustainability/SustainabilityCTA';

const Sustainability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SustainabilityHero />
      <SustainabilityHighlights
        triggerFooterContact={function (): void {
          throw new Error('Function not implemented.');
        }}
        scrollToProjects={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SustainabilityShowcase />
      <SustainabilityStats />
      <SustainabilityPath />
      <SustainabilityCTA
        triggerFooterContact={function (): void {
          throw new Error('Function not implemented.');
        }}
        scrollToProjects={function (): void {
          throw new Error('Function not implemented.');
        }}
      />

      <Footer />
    </div>
  );
};

export default Sustainability;
