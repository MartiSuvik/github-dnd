import { useEffect } from 'react';
import SustainabilityHero from '../components/sustainability/SustainabilityHero';
import SustainabilityHighlights from '../components/sustainability/SustainabilityHighlights';
import SustainabilityShowcase from '../components/sustainability/SustainabilityShowcase';
import SustainabilityStats from '../components/sustainability/SustainabilityStats';
import SustainabilityPath from '../components/sustainability/SustainabilityPath';
import SustainabilityCTA from '../components/sustainability/SustainabilityCTA';
import { useFooterContact } from '../hooks/useFooterContact';
import { Helmet } from 'react-helmet';

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

  // Use the hook
  const { triggerFooterContact } = useFooterContact();

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>D&D Design Center | Sustainability</title>
        <meta name="description" content="Discover our commitment to sustainability and eco-friendly practices at D&D Design Center." />
      </Helmet>
      <SustainabilityHero />
      <SustainabilityHighlights
        triggerFooterContact={triggerFooterContact}
        scrollToProjects={() => {}}
      />
      <SustainabilityShowcase />
      <SustainabilityStats />
      <SustainabilityPath />
      <SustainabilityCTA
        triggerFooterContact={triggerFooterContact}
      />
    </div>
  );
};

export default Sustainability;
