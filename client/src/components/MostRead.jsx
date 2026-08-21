import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getTrendingPosts } from "../services/public.service";
import { Eye, Heart } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

function MostRead() {
  const { t } = useTranslation();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingPosts(5);
        if (data?.data && Array.isArray(data.data)) {
          setTrending(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch trending posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="py-24 bg-white relative" id="trending">
      <div className="max-w-4xl mx-auto px-5">
        <div className="mb-12 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-3"
          >
            {t("mostRead.kicker") || "TOP STORIES"}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-extrabold text-[#4A2B4D]"
          >
            {t("mostRead.title") || "Trending Blogs"}
          </motion.h2>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400">Loading trending posts...</div>
        ) : trending.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No trending blogs found.</div>
        ) : (
          <motion.ol 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-4"
          >
            {trending.map((item, index) => (
              <motion.li 
                variants={fadeRight}
                key={item.id || index} 
                className="group flex items-center justify-between gap-6 p-4 md:p-6 rounded-2xl hover:bg-[#fefaf8] transition-colors cursor-pointer border border-transparent hover:border-[#4A2B4D]/10"
              >
                <Link to={`/blogs/${item.slug}`} className="flex items-center gap-6 w-full">
                  <span className="text-4xl md:text-5xl font-serif font-black text-[#4A2B4D]/10 group-hover:text-amber-500 transition-colors">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <span className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-[#4A2B4D] transition-colors block">
                      {item.title}
                    </span>
                    {item.category && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mt-1 inline-block">
                        {item.category.name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1"><Eye size={14} /> {item.views || 0}</span>
                    <span className="flex items-center gap-1"><Heart size={14} /> {item.likes || 0}</span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </section>
  );
}

export default MostRead;