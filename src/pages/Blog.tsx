import { useEffect } from 'react';
import BlogHero from '../components/blog/BlogHero';
import BlogGrid from '../components/blog/BlogGrid';
import BlogCTA from '../components/blog/BlogCTA';

const Blog = () => {
 
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  function triggerFooterContact(): void {
    const contactSection = document.getElementById('footer-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16 md:pt-20">
        <BlogHero />
        <BlogGrid />
        <BlogCTA triggerFooterContact={triggerFooterContact}/>
      </main>
    </div>
  );
};

export default Blog;
