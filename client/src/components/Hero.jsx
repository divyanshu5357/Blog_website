import {
  ArrowRight,
  Baby,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useTypingLoop from "../hooks/useTypingLoop";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemLeftVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(5px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }
};

function Hero() {
  const { t } = useTranslation();
  const typedWord = useTypingLoop([t("hero.brandWord")]);

  const categories = [
    { name: t("hero.focusCards.health"), icon: HeartPulse, color: "text-orange-500", border: "border-orange-200", delay: 0 },
    { name: t("hero.focusCards.education"), icon: GraduationCap, color: "text-teal-600", border: "border-teal-200", delay: 0.5 },
    { name: t("hero.focusCards.family"), icon: Baby, color: "text-purple-500", border: "border-purple-200", delay: 1 },
    { name: t("hero.focusCards.workplace"), icon: BriefcaseBusiness, color: "text-blue-500", border: "border-blue-200", delay: 1.5 },
  ];

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-orange-50/30 to-amber-50 overflow-hidden py-20 px-5 sm:px-10 mt-16 md:mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-brand-light/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl shadow-orange-900/5 border border-white/60"
        >
          <motion.p variants={itemLeftVariants} className="text-amber-600 font-bold tracking-wide uppercase text-sm mb-4">
            {t("hero.eyebrow")}
          </motion.p>
          
          <motion.h1 
            variants={itemLeftVariants} 
            aria-label={t("hero.brandAriaLabel")}
            className="text-5xl sm:text-6xl font-serif font-extrabold text-brand-purple tracking-tight mb-6 flex items-center"
          >
            <span className="relative inline-block mr-[2px]">
              <span className="absolute -left-1 text-pink-400/50 mix-blend-multiply">{typedWord.slice(0, 1)}</span>
              <span className="relative">{typedWord.slice(0, 1)}</span>
            </span>
            <span>{typedWord.slice(1)}</span>
            <span className="inline-block w-[3px] h-[1em] bg-brand-purple ml-1 animate-pulse" aria-hidden="true" />
          </motion.h1>

          <motion.p variants={itemLeftVariants} className="text-2xl sm:text-3xl font-serif font-bold text-amber-600 leading-snug mb-10">
            {t("hero.tagline")}
          </motion.p>

          <motion.div variants={itemLeftVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a 
              href="#blogs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-amber-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
            >
              {t("hero.exploreArticles")}
              <ArrowRight size={20} />
            </motion.a>
            
            <motion.a 
              href="#live-sessions"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-white/50 border-2 border-brand-purple/10 text-brand-purple px-8 py-4 rounded-xl font-bold text-lg hover:border-brand-purple/30 transition-all"
            >
              {t("hero.joinLiveSessions")}
              <CalendarDays size={20} className="text-brand-purple/60" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Interactive Animated Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={t("hero.focusAreasAriaLabel")}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative perspective-1000"
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                animate={floatingAnimation}
                style={{ animationDelay: `${cat.delay}s` }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className={`bg-white p-8 rounded-2xl border-t-4 shadow-sm flex flex-col justify-center min-h-[180px] cursor-pointer transition-colors hover:bg-gray-50/50 ${cat.border}`}
              >
                <div className={`${cat.color} bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-6`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-purple">
                  {cat.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;