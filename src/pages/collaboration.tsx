import { useEffect } from 'react';
import VisionnaireHero from '../components/collaboration/VisionnaireHero';
import VisionnaireIntroWithLoopingWords from '../components/collaboration/VisionnaireIntroWithLoopingWords';
import VisionnaireShowcase from '../components/collaboration/VisionnaireShowcase';
import VisionnaireCTA from '../components/collaboration/VisionnaireCTA';
import VisionnaireThankYou from '../components/collaboration/VisionnaireThankYou';
import { HeroScrollDemo } from '../components/ui/HeroScrollDemo';
import { GridMotionDemo } from '../components/collaboration/GridMotionDemo';
import { useFooterContact } from '../hooks/useFooterContact';
import { Helmet } from 'react-helmet';

const Collaboration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use the hook
  const { triggerFooterContact } = useFooterContact();

  return (
    <div className="relative min-h-screen bg-white">
      <Helmet>
        <title>D&D Design Center | Collaboration</title>
        <meta name="description" content="Learn about our collaborations with top designers and brands at D&D Design Center." />
      </Helmet>
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
