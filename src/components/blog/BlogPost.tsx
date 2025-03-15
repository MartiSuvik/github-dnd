import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';

interface BlogPostProps {
  post: {
    title: string;
    excerpt: string;
    image: {
      url: string;
      alt: string;
      photographer: string;
      photographerUrl: string;
    };
    category: string;
    date: string;
    readTime: number;
  };
  index: number;
}

const BlogPost = ({ post, index }: BlogPostProps) => {
  return (
    <motion.article 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
    >
      <div className="relative aspect-[16/9] overflow-hidden group">
        <img
          src={post.image.url}
          alt={post.image.alt}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#C5A267] text-white text-sm rounded-full">
            {post.category}
          </span>
        </div>
        <a 
          href={post.image.photographerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 text-xs text-white/80 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
        >
          Photo by {post.image.photographer}
        </a>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <h3 className="text-xl font-serif mb-3 text-gray-900 dark:text-white">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
          {post.excerpt}
        </p>

        <button className="inline-flex items-center gap-2 text-[#C5A267] hover:text-[#B49157] transition-colors duration-200 group">
          <span>Read More</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
        </button>
      </div>
    </motion.article>
  );
};

export default BlogPost;