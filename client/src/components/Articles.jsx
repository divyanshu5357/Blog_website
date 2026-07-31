import { useEffect, useState } from "react";
import { ArrowRight, User, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedPosts } from "../services/public.service";
import { motion } from "framer-motion";

// Smoother, more elegant entrance animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// Skeleton loader for better UX during API calls
const SkeletonCard = () => (
  <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
    <div className="h-60 bg-slate-200/60" />
    <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
      <div className="h-7 bg-slate-200/60 rounded-md w-4/5" />
      <div className="space-y-2 mt-2">
        <div className="h-4 bg-slate-200/60 rounded-md w-full" />
        <div className="h-4 bg-slate-200/60 rounded-md w-5/6" />
      </div>
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="h-4 bg-slate-200/60 rounded-md w-1/3" />
        <div className="w-10 h-10 bg-slate-200/60 rounded-full" />
      </div>
    </div>
  </div>
);

function Articles() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getFeaturedPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="articles">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-indigo-600 font-semibold tracking-wider uppercase text-sm mb-4">
              <BookOpen size={18} />
              <span>Latest Articles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Featured Insights
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link 
              to="/blogs" 
              className="group flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-full text-slate-700 font-medium hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md"
            >
              View all articles 
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : posts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <motion.article
                variants={itemVariants}
                key={post.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={`/blogs/${post.slug}`} className="block relative h-60 overflow-hidden bg-slate-100">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">
                      <span className="text-indigo-200/50 font-serif text-3xl font-bold tracking-widest">
                        AARAMBH
                      </span>
                    </div>
                  )}
                  
                  {post.category?.name && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-bold text-slate-800 uppercase tracking-wider shadow-sm">
                      {post.category.name}
                    </div>
                  )}
                </Link>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <Link to={`/blogs/${post.slug}`} className="block mb-4">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center">
                        <User size={14} className="text-indigo-600" />
                      </div>
                      <span className="uppercase tracking-wider">
                        {post.author?.firstName} {post.author?.lastName}
                      </span>
                    </div>
                    
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                      aria-label="Read article"
                    >
                      <ArrowRight size={18} className="transform group-hover:-rotate-45 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4 text-slate-400">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Articles Yet</h3>
            <p className="text-slate-500">Check back soon for our latest featured insights and updates.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Articles;