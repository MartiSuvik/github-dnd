import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogPost from './BlogPost';
import { Filter } from 'lucide-react';

const categories = ['All', 'Design', 'Inspiration', 'Trends', 'Sustainability', 'Craftsmanship'];

// Curated list of high-quality interior design images from Unsplash
const blogImages = [
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80',
    alt: 'Modern living room with minimalist furniture and natural light',
    photographer: 'Spacejoy',
    photographerUrl: 'https://unsplash.com/@spacejoy'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80',
    alt: 'Elegant dining room with chandelier and wooden table',
    photographer: 'R Architecture',
    photographerUrl: 'https://unsplash.com/@rarchitecture_melbourne'
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80',
    alt: 'Contemporary kitchen with marble countertops and modern appliances',
    photographer: 'R Architecture',
    photographerUrl: 'https://unsplash.com/@rarchitecture_melbourne'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
    alt: 'Luxurious bedroom with panoramic windows and designer furniture',
    photographer: 'R Architecture',
    photographerUrl: 'https://unsplash.com/@rarchitecture_melbourne'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80',
    alt: 'Sustainable eco-friendly living room with natural materials',
    photographer: 'R Architecture',
    photographerUrl: 'https://unsplash.com/@rarchitecture_melbourne'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&auto=format&fit=crop&q=80',
    alt: 'Modern bathroom with freestanding bathtub and marble tiles',
    photographer: 'R Architecture',
    photographerUrl: 'https://unsplash.com/@rarchitecture_melbourne'
  },
  {
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&auto=format&fit=crop&q=80',
    alt: 'Artisanal crafted furniture in a contemporary setting',
    photographer: 'Spacejoy',
    photographerUrl: 'https://unsplash.com/@spacejoy'
  },
  {
    url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&auto=format&fit=crop&q=80',
    alt: 'Interior design trends featuring bold colors and patterns',
    photographer: 'Spacejoy',
    photographerUrl: 'https://unsplash.com/@spacejoy'
  },
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80',
    alt: 'Sustainable home office with ergonomic furniture',
    photographer: 'Spacejoy',
    photographerUrl: 'https://unsplash.com/@spacejoy'
  }
];

const blogPosts = [
  {
    id: 1,
    title: 'The Evolution of Modern Interior Design',
    excerpt: 'Explore how contemporary design principles are reshaping our living spaces with a focus on functionality and aesthetics.',
    category: 'Design',
    date: '2024-03-15',
    readTime: 8
  },
  {
    id: 2,
    title: 'Sustainable Living: The Future of Home Design',
    excerpt: 'Discover how eco-friendly materials and sustainable practices are revolutionizing interior design.',
    category: 'Sustainability',
    date: '2024-03-12',
    readTime: 6
  },
  {
    id: 3,
    title: 'Artisanal Craftsmanship in Modern Furniture',
    excerpt: 'Learn about the intersection of traditional craftsmanship and contemporary design in luxury furniture.',
    category: 'Craftsmanship',
    date: '2024-03-10',
    readTime: 7
  },
  {
    id: 4,
    title: '2024 Color Trends in Interior Design',
    excerpt: 'Stay ahead of the curve with our comprehensive guide to this years most influential color palettes.',
    category: 'Trends',
    date: '2024-03-08',
    readTime: 5
  },
  {
    id: 5,
    title: 'Biophilic Design: Bringing Nature Indoors',
    excerpt: 'Explore how incorporating natural elements can transform your living space and improve wellbeing.',
    category: 'Inspiration',
    date: '2024-03-05',
    readTime: 9
  },
  {
    id: 6,
    title: 'The Art of Lighting Design',
    excerpt: 'Master the principles of lighting design to create the perfect ambiance in any room.',
    category: 'Design',
    date: '2024-03-03',
    readTime: 7
  },
  {
    id: 7,
    title: 'Minimalism Meets Luxury',
    excerpt: 'Discover how to achieve an elegant, minimalist aesthetic without sacrificing comfort.',
    category: 'Trends',
    date: '2024-03-01',
    readTime: 6
  },
  {
    id: 8,
    title: 'Traditional Techniques in Modern Design',
    excerpt: 'How age-old craftsmanship continues to influence contemporary furniture design.',
    category: 'Craftsmanship',
    date: '2024-02-28',
    readTime: 8
  },
  {
    id: 9,
    title: 'Smart Homes: The Future of Living',
    excerpt: 'Explore how technology is seamlessly integrating with interior design for enhanced living experiences.',
    category: 'Trends',
    date: '2024-02-25',
    readTime: 7
  }
];

const BlogGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Combine blog posts with images
        const postsWithImages = blogPosts.map((post, index) => ({
          ...post,
          image: blogImages[index]
        }));
        setPosts(postsWithImages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif dark:text-white">Latest Articles</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-gray-600 dark:text-gray-300"
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
          
          <div className={`flex flex-wrap gap-3 ${showFilters ? 'block' : 'hidden md:flex'}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#C5A267] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A267]"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredPosts.map((post, index) => (
              <BlogPost key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;