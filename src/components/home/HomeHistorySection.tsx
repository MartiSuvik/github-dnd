import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones, HistoryMilestone } from "./History";

gsap.registerPlugin(ScrollTrigger);

const HomeHistorySection = () => {
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const addToMilestoneRefs = (el: HTMLDivElement | null, index: number) => {
    milestoneRefs.current[index] = el;
  };

  const addToImageRefs = (el: HTMLDivElement | null, index: number) => {
    imageRefs.current[index] = el;
  };

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Milestone animations
    milestoneRefs.current.forEach((milestoneEl, i) => {
      const imgContainer = imageRefs.current[i];
      if (!milestoneEl || !imgContainer) return;

      gsap.fromTo(
        milestoneEl,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: milestoneEl,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        imgContainer,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: milestoneEl,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 0.5,
          },
        }
      );
    });
  }, []);

  return (
    <section id="HomeHistorySection" ref={sectionRef} className="py-12 md:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 ref={titleRef} className="text-4xl sm:text-6xl md:text-8xl font-serif text-center mb-8 md:mb-16">
          OUR HISTORY
        </h1>

        <div className="relative">
          {/* Vertical timeline line - hidden on mobile, visible on larger screens */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#C5A267] hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone: HistoryMilestone, index: number) => (
              <div
                key={milestone.year}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                ref={(el) => addToMilestoneRefs(el, index)}
              >
                {/* The timeline dot - hidden on mobile */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#C5A267] rounded-full z-10 hidden md:block" />

                {/* Text Section */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div
                    className={`bg-white p-4 md:p-6 rounded-lg shadow-lg relative z-20 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-[#C5A267] text-lg md:text-xl font-bold">{milestone.year}</span>
                    <h3 className="text-xl font-serif mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Artistic Image Container */}
                <div
                  className={`mt-4 md:mt-0 md:absolute md:top-1/2 md:transform md:-translate-y-1/2 ${
                    index % 2 === 0 ? "md:left-[55%]" : "md:right-[55%]"
                  } z-30`}
                  ref={(el) => addToImageRefs(el, index)}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                    {/* Tilted background "frame" */}
                    <div className="absolute inset-0 bg-white rounded-full shadow-lg rotate-6 -z-10" />

                    {/* Actual Image */}
                    <img
                      src={milestone.image}
                      alt={milestone.alt}
                      className="w-full h-full object-cover rounded-full shadow-md"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHistorySection;
