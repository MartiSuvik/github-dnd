import { useState, useEffect, useRef } from 'react';
import Airtable from 'airtable';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottomSheetExpandedCard from './BottomSheetExpandedCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  room: string;
  style: string;
  imageUrl: string;
  styleName?: string;
  additionalImages?: string[];
}

const ITEMS_PER_PAGE = 4;
const ITEMS_PER_ROW = 2;

const styleNames = [
  'Eclipse',
  'Nova',
  'Zenith',
  'Vertex',
  'Prism',
  'Quantum',
  'Nebula',
  'Aurora',
  'Apex',
  'Horizon',
  'Celestial',
  'Cosmos',
  'Stellar',
  'Galaxy',
  'Orbit',
  'Solstice',
  'Equinox',
  'Spectrum',
  'Fusion',
  'Radiance',
  'Mirage',
  'Vortex',
  'Obsidian',
  'Infinity',
  'Eternity',
  'Momentum',
  'Pulse',
  'Essence',
  'Serenity',
  'Ethereal',
  'Luminous',
  'Vista',
  'Verve',
  'Synthesis',
  'Reverie',
  'Enigma',
  'Lumina',
  'Catalyst',
  'Reflection',
  'Empyrean',
];

const ProductGalleryContent: React.FC = () => {
  // Data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('Kitchen');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'categories' | 'styles'>('categories');

  // Refs for categories & styles (still used for minor animations or references)
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const styleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const rooms = [
    'Kitchen',
    'Furniture',
    'Light',
    'Bath',
    'Outdoor',
    'Office'
  ];

  const kitchenStyles = ['Modern', 'Traditional', 'Art Deco'];
  const furnitureTypes = ['Living Room', 'Dining Room', 'Bedroom'];

  // 1) Basic GSAP for categories (unchanged)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      categoryRefs.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );

    if ((selectedRoom === 'Kitchen' || selectedRoom === 'Furniture') && activeTab === 'styles') {
      gsap.fromTo(
        styleRefs.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [selectedRoom, activeTab]);

  // 2) Fetch projects from Airtable
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const base = new Airtable({
          apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
        }).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

        const records = await base('database').select().all();
        const fetchedProjects = records.map((record, index) => ({
          id: record.id,
          title: record.fields['Title'] as string,
          room: record.fields['Room'] as string,
          style: record.fields['Style'] as string,
          imageUrl: record.fields['Cloudinary URL'] as string,
          styleName: styleNames[index % styleNames.length],
        }));

        setProjects(fetchedProjects);
        setVisibleProjects(fetchedProjects.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch projects'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 3) Update visible projects on filter changes
  useEffect(() => {
    let filtered = [...projects];
    if (selectedRoom !== 'all') {
      filtered = filtered.filter((p) => p.room === selectedRoom);
    }
    if ((selectedRoom === 'Kitchen' || selectedRoom === 'Furniture') && selectedStyle !== 'all') {
      filtered = filtered.filter((p) => p.style === selectedStyle);
    }
    setVisibleProjects(filtered.slice(0, ITEMS_PER_PAGE));
    setExpandedProjectId(null);
  }, [projects, selectedRoom, selectedStyle]);

  // 4) handleCardLoad -> Animate card once image is loaded
  const handleCardLoad = (index: number) => {
    const cardEl = cardRefs.current[index];
    if (!cardEl) return;

    // GSAP fade/lift once image loaded
    gsap.fromTo(
      cardEl,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  };

  // 5) Load More
  const loadMore = () => {
    const currentLength = visibleProjects.length;
    let filtered = [...projects];

    if (selectedRoom !== 'all') {
      filtered = filtered.filter((p) => p.room === selectedRoom);
    }
    if ((selectedRoom === 'Kitchen' || selectedRoom === 'Furniture') && selectedStyle !== 'all') {
      filtered = filtered.filter((p) => p.style === selectedStyle);
    }

    setVisibleProjects(filtered.slice(0, currentLength + ITEMS_PER_PAGE));
  };

  const handleProjectClick = (projectId: string) => {
    setExpandedProjectId(projectId === expandedProjectId ? null : projectId);
  };

  // Toggle between categories and styles tabs (mobile-friendly)
  const toggleTab = (tab: 'categories' | 'styles') => {
    setActiveTab(tab);
  };

  // 6) renderProjectRows with cardRefs & onLoad
  const renderProjectRows = () => {
    const rows = [];
    for (let i = 0; i < visibleProjects.length; i += ITEMS_PER_ROW) {
      const rowProjects = visibleProjects.slice(i, i + ITEMS_PER_ROW);

      rows.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
          {rowProjects.map((project, index) => {
            const cardIndex = i + index;

            return (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[cardIndex] = el)}
                className="group relative overflow-hidden cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => handleProjectClick(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project.id);
                  }
                }}
                aria-expanded={expandedProjectId === project.id}
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onLoad={() => handleCardLoad(cardIndex)}
                  />
                </div>

                {/* Title, style, etc. */}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-serif text-black mb-1">
                      {project.styleName}
                    </h3>
                    <span className="block text-sm uppercase tracking-wider text-gray-500">
                      {project.style
                        ? `${project.room} / ${project.style}`
                        : project.room}
                    </span>
                  </div>
                  <div className="text-[#B49157] transition-transform duration-300">
                    {expandedProjectId === project.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return rows;
  };

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div id="product-gallery" className="py-12 md:py-20 bg-white">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Selection */}
        <div className="mb-12 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-2 md:mb-4">
              EXPLORE OUR PRODUCTS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              by Designers that move outside the traditional boundaries.
            </p>
          </div>

          {/* Mobile Tab Selector */}
          <div className="flex border-b border-gray-200 mb-6 md:hidden">
            <button
              onClick={() => toggleTab('categories')}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'categories'
                  ? 'text-[#C5A267] border-b-2 border-[#C5A267]'
                  : 'text-gray-500'
              }`}
            >
              Categories
            </button>
            {(selectedRoom === 'Kitchen' || selectedRoom === 'Furniture') && (
              <button
                onClick={() => toggleTab('styles')}
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === 'styles'
                    ? 'text-[#C5A267] border-b-2 border-[#C5A267]'
                    : 'text-gray-500'
                }`}
              >
                {selectedRoom === 'Kitchen' ? 'Styles' : 'Room Types'}
              </button>
            )}
          </div>

          {/* Categories - Always visible on desktop, conditionally on mobile */}
          <div className={`md:block ${activeTab === 'categories' ? 'block' : 'hidden'}`}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {rooms.map((room, index) => (
                <button
                  key={room}
                  ref={(el) => (categoryRefs.current[index] = el)}
                  onClick={() => {
                    setSelectedRoom(room);
                    setSelectedStyle('all');
                    if (room === 'Kitchen' || room === 'Furniture') {
                      setActiveTab('styles');
                    }
                  }}
                  className={`text-base md:text-lg transition-colors duration-300 px-3 py-2 rounded-full ${
                    selectedRoom === room
                      ? 'bg-[#C5A267] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Style Filter - Always visible on desktop when applicable, conditionally on mobile */}
          {(selectedRoom === 'Kitchen' || selectedRoom === 'Furniture') && (
            <div className={`mt-6 md:block ${activeTab === 'styles' ? 'block' : 'hidden'}`}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  ref={(el) => (styleRefs.current[0] = el)}
                  onClick={() => setSelectedStyle('all')}
                  className={`text-sm md:text-base transition-colors duration-300 px-3 py-2 rounded-full ${
                    selectedStyle === 'all'
                      ? 'bg-[#C5A267] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  All {selectedRoom === 'Kitchen' ? 'Styles' : 'Rooms'}
                </button>

                {(selectedRoom === 'Kitchen' ? kitchenStyles : furnitureTypes).map((style, idx) => (
                  <button
                    key={style}
                    ref={(el) => (styleRefs.current[idx + 1] = el)}
                    onClick={() => setSelectedStyle(style)}
                    className={`text-sm md:text-base transition-colors duration-300 px-3 py-2 rounded-full ${
                      selectedStyle === style
                        ? 'bg-[#C5A267] text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid or Loading Spinner */}
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B49157] border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Render the rows */}
            {renderProjectRows()}

            {/* Bottom Sheet Card for expanded project */}
            {expandedProjectId && (
              <BottomSheetExpandedCard
                project={projects.find((p) => p.id === expandedProjectId)!}
                onClose={() => setExpandedProjectId(null)}
              />
            )}

            {/* Load More Button */}
            {visibleProjects.length < projects.length && (
              <div className="mt-8 md:mt-16 text-center">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-[#B49157] text-white text-base font-medium rounded-sm hover:bg-[#A38047] transition-colors duration-300 min-h-[44px]"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGalleryContent;