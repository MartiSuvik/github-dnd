import { useEffect } from 'react';
import Footer from '../components/ui/Footer';
import BlogHero from '../components/blog/BlogHero';
import BlogGrid from '../components/blog/BlogGrid';
import { useTheme } from '../hooks/useTheme';

const Blog = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}
    >
      <main className="pt-16 md:pt-20">
        <BlogHero />
        <BlogGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
