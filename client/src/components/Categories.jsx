import { useEffect, useState } from "react";
import { Brain, ArrowRight } from "lucide-react";
import { getPublicCategories } from "../services/category.service";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getPublicCategories();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white relative" id="blogs">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Animated Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-3">
              Explore Categories
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#4A2B4D] leading-tight">
              Blogs that meet real life where it happens.
            </h2>
          </motion.div>
        </div>

        {/* Dynamic Animated Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-gray-50 rounded-3xl p-8 h-[220px] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={item}>
                <Link 
                  to={`/category/${category.slug}`}
                  className="block group bg-[#fefaf8] p-8 rounded-3xl border border-amber-900/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-amber-100 text-amber-600">
                    <Brain size={32} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#4A2B4D] mb-2 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-6 flex-1">
                    {category.description || "Explore articles from this category."}
                  </p>
                  
                  <div className="flex items-center gap-2 text-amber-600 text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform mt-auto">
                    Explore <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Categories;