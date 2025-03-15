import { useEffect } from 'react';
import Footer from '../components/ui/Footer';
import VisionnaireHero from '../components/collaboration/VisionnaireHero';
import VisionnaireIntroWithLoopingWords from '../components/collaboration/VisionnaireIntroWithLoopingWords';
import VisionnaireShowcase from '../components/collaboration/VisionnaireShowcase';
import VisionnaireCTA from '../components/collaboration/VisionnaireCTA';
import VisionnaireThankYou from '../components/collaboration/VisionnaireThankYou';
import { HeroScrollDemo } from '../components/ui/HeroScrollDemo';
import { GridMotionDemo } from '../components/collaboration/GridMotionDemo';

const Collaboration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function triggerFooterContact(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <VisionnaireHero />
        <VisionnaireIntroWithLoopingWords />
        <GridMotionDemo />
        <VisionnaireShowcase />
        <VisionnaireThankYou />
        <HeroScrollDemo />
        <VisionnaireCTA triggerFooterContact={triggerFooterContact} />
      </main>
      <Footer />
    </div>
  );
};

export default Collaboration;
