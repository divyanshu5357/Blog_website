import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Mail, Github, Twitter, Linkedin, Heart, ArrowRight } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer className="bg-[#141118] text-slate-300 relative overflow-hidden border-t border-amber-500/10 pt-20 pb-12">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
        >
          {/* Brand & Tagline */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Sparkles size={20} />
              </div>
              <span className="text-2xl font-serif font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                {t("brand.title")}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-light">
              {t("brand.description")}
            </p>

            <p className="text-amber-400/90 text-xs font-medium italic max-w-md pt-2">
              "{t("footer.tagline")}"
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 hover:bg-slate-800 transition-all hover:-translate-y-0.5"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 hover:bg-slate-800 transition-all hover:-translate-y-0.5"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 hover:bg-slate-800 transition-all hover:-translate-y-0.5"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:contact@aarambh.com"
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 hover:bg-slate-800 transition-all hover:-translate-y-0.5"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* Navigation Column 1: Explore */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold tracking-wider text-sm uppercase border-b border-slate-800 pb-3">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#about-aarambh"
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowRight size={13} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {t("footer.links.about")}
                </a>
              </li>
              <li>
                <a
                  href="#blogs"
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowRight size={13} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {t("footer.links.blogs")}
                </a>
              </li>
              <li>
                <a
                  href="#live-sessions"
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowRight size={13} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {t("footer.links.liveSessions")}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Navigation Column 2: Connect */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold tracking-wider text-sm uppercase border-b border-slate-800 pb-3">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#resources"
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowRight size={13} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {t("footer.links.resources")}
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  className="group flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowRight size={13} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {t("footer.links.community")}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Quick Action / Back to top card */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-white font-semibold tracking-wider text-sm uppercase border-b border-slate-800 pb-3">
              Back to Top
            </h4>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3">
              <p className="text-xs text-slate-400">
                Back to top to explore more articles & upcoming live sessions.
              </p>
              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <ArrowUp size={14} />
                Scroll to Top
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}