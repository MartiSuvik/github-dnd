import { useEffect } from 'react'; // Use useEffect instead of useContext
import TestimonialsSection from '../components/ui/testimonials-with-marquee';
import CaseStudies from '../components/howwework/CaseStudies';
import HowWeWorkHero from '../components/howwework/HowWeWorkHero';
import HowWeWorkStages from '../components/howwework/HowWeWorkStages';
import HowWeWorkCallToAction from '../components/howwework/HowWeWorkCallToAction';
import { FeatureStepsDemo } from '../components/howwework/FeatureStepsDemo';
import { AnimatePresence } from 'framer-motion';
import { useFooterContact } from '../hooks/useFooterContact';
import { Helmet } from 'react-helmet';

const testimonials = [
  {
    author: { name: 'Nataliya Narizhna' },
    rating: '5/5',
    text: 'Beautiful store with great selection of unique and high quality furniture. Very happy with the service, Dmitriy is an amazing sales person, we’ve been ordering with him for years. Good prices as opposed to other high end furniture stores. Highly recommend.',
  },
  {
    author: { name: 'Anna Ka' },
    rating: '5/5',
    text: "It's truly a place with a big selection of designs and designers for kitchen, dining room, and bathrooms. Some items are very expensive, some reasonably priced. For me, it was better to see it in the showroom and not in the catalog.",
  },
  {
    author: { name: 'VLAD VLAD' },
    rating: '5/5',
    text: 'Good stuff, good guys, prices, you get what you pay for.',
  },
  {
    author: { name: 'Felix Z' },
    rating: '5/5',
    text: 'Nice selection, good quality furniture!',
  },
  {
    author: { name: 'Margarita Yaguda' },
    rating: '4/5',
    text: 'Exclusive beautiful place to design your home. However expensive.',
  },
  {
    author: { name: 'Jules Gutierez' },
    rating: '5/5',
    text: 'Great selection.',
  },
  {
    author: { name: 'Temo Mchedlishvili' },
    rating: '5/5',
    text: 'Excellent 👌',
  },
  {
    author: { name: 'Rudy' },
    rating: '5/5',
    text: '',
  },
  {
    author: { name: 'Robert Nelson' },
    rating: '5/5',
    text: '',
  },
  {
    author: { name: 'emil karaev (Emilien Black)' },
    rating: '4/5',
    text: '',
  },
  {
    author: { name: 'Derrick Aloys' },
    rating: '4/5',
    text: '',
  },
  {
    author: { name: 'NURBEK KAYUMOV' },
    rating: '5/5',
    text: '',
  },
  {
    author: { name: 'Leora Leybovich' },
    rating: '5/5',
    text: '',
  },
];

const HowWeWork = () => {
  // Add useEffect for initial scroll behavior like in
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use the hook for footer contact behavior
  const { triggerFooterContact } = useFooterContact();

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Helmet>
        <title>D&D Design Center | How We Work</title>
        <meta name="description" content="Learn about our process and how we create luxury custom furniture at D&D Design Center." />
      </Helmet>
      <HowWeWorkHero />
      <HowWeWorkStages />
      <AnimatePresence mode="sync">
        <FeatureStepsDemo />
      </AnimatePresence>
      <CaseStudies />
      <TestimonialsSection
        title="What Our Clients Say"
        description="Discover why clients trust us with their luxury interior design"
        testimonials={testimonials}
      />
      <HowWeWorkCallToAction
        triggerFooterContact={triggerFooterContact}
      />
    </div>
  );
};

export default HowWeWork;
