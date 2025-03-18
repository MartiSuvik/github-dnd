const HomeHeroBottom = () => {
  return (
    <section className="relative min-h-[400px] w-full">
      {/* Hidden image for SEO indexing */}
      <div className="hidden">
        <img
          src="https://res.cloudinary.com/designcenter/image/upload/Luxury%20Custom%20Furniture%20and%20Interior%20Design%20%E2%80%93%20DnD%20Design%20Center%20NYC.avif"
          alt="Luxury interior space featuring custom-designed sofas and handcrafted marble coffee table by D&D Design Center in Brooklyn."
          loading="lazy"
        />
      </div>

      {/* Background image with better ARIA attributes */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/designcenter/image/upload/Luxury%20Custom%20Furniture%20and%20Interior%20Design%20%E2%80%93%20DnD%20Design%20Center%20NYC.avif")',
        }}
        aria-hidden="true"
      >
        {/* Light black overlay (optional) */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Bottom fade overlay (from transparent to white) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white" />

      {/* Content area */}
      <div className="relative h-full min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-16">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
        D&D Design Center<br />Luxury Custom Furniture Across America
      </h2>
        {/* Hidden description for screen readers */}
        <span className="sr-only">
          D&D Design Center bespoke furniture solutions in New York City
        </span>
      </div>
    </section>
  );
};

export default HomeHeroBottom;
