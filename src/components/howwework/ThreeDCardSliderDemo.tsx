import React from 'react';
import { ThreeDCardSlider } from '../ui/3DCardSlider';
import { useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: 'Consultation',
    description: 'Visit our **New York** showroom or connect via email for a **personalized consultation**.',
    icon: <span className="w-6 h-6 sm:w-8 sm:h-8 text-white text-2xl sm:text-3xl font-bold flex items-center justify-center">{1}</span>,
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop',
    details: [
      'Personal design consultation',
      'Space assessment',
      'Style preferences discussion',
      'Budget planning',
    ],
  },
  {
    id: 2,
    title: 'Concept',
    description: 'Receive **tailored sketches** that bring your **vision to life**.',
    icon: <span className="w-6 h-6 sm:w-8 sm:h-8 text-white text-2xl sm:text-3xl font-bold flex items-center justify-center">{2}</span>,
    imageUrl: 'https://images.unsplash.com/photo-1600428610161-e98636332e98?q=80&w=2940&auto=format&fit=crop',
    details: [
      'Detailed sketches',
      '3D visualizations',
      'Material selections',
      'Color palette development',
    ],
  },
  {
    id: 3,
    title: 'Craftsmanship',
    description: '**Experience** exquisite Italian craftsmanship where every detail is meticulously **executed to perfection**.',
    icon: <span className="w-6 h-6 sm:w-8 sm:h-8 text-white text-2xl sm:text-3xl font-bold flex items-center justify-center">{3}</span>,
    imageUrl: 'https://images.unsplash.com/photo-1553051021-9f94520a6cad?q=80&w=2940&auto=format&fit=crop',
    details: [
      'Master artisan selection',
      'Premium material sourcing',
      'Handcrafted excellence',
      'Quality assurance',
    ],
  },
  {
    id: 4,
    title: 'Delivery',
    description: 'Your bespoke order is prepared and delivered with flawless precision, **ensuring your space** is transformed **effortlessly**.',
    icon: <span className="w-6 h-6 sm:w-8 sm:h-8 text-white text-2xl sm:text-3xl font-bold flex items-center justify-center">{4}</span>,
    imageUrl: 'https://images.unsplash.com/photo-1464029902023-f42eba355bde?q=80&w=2940&auto=format&fit=crop',
    details: [
      'White glove delivery',
      'Professional installation',
      'Final inspection',
      'Client walkthrough',
    ],
  },
];

export const ThreeDCardSliderDemo: React.FC = () => {

  return (
    <section id="how-we-work" className="py-16 sm:py-20 md:py-24 px-4 bg-[linear-gradient(to_bottom,white_70%,#1A1A1A_60%)] min-h-[80vh] sm:min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-black text-center mb-6 sm:mb-8">
          HOW WE WORK
        </h2>
        <p className="text-black/70 text-center max-w-xl mx-auto mb-8 text-base sm:text-lg">
          From initial consultation to final delivery, we ensure a seamless experience.
        </p>
        <ThreeDCardSlider 
          slides={slides} 
          autoPlayInterval={4000}
        />
      </div>
    </section>
  );
};