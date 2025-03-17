import { useEffect } from 'react';
import VisionnaireHero from '../components/collaboration/VisionnaireHero';
import VisionnaireIntroWithLoopingWords from '../components/collaboration/VisionnaireIntroWithLoopingWords';
import VisionnaireShowcase from '../components/collaboration/VisionnaireShowcase';
import VisionnaireCTA from '../components/collaboration/VisionnaireCTA';
import VisionnaireThankYou from '../components/collaboration/VisionnaireThankYou';
import { HeroScrollDemo } from '../components/ui/HeroScrollDemo';
import { GridMotionDemo } from '../components/collaboration/GridMotionDemo';
import { useFooterContact } from '../hooks/useFooterContact';

const Collaboration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use the hook
  const { triggerFooterContact } = useFooterContact();

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
    </div>
  );
};

export default Collaboration;
