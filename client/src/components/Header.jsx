import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Users, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  // Navigation Items
  const navLinks = [
    { key: "home", href: "#home", label: t("nav.home") || "Home" },
    { key: "about", href: "#about-aarambh", label: t("nav.about") || "About" },
    { key: "blogs", href: "#blogs", label: t("nav.blogs") || "Blogs" },
    { key: "sessions", href: "#live-sessions", label: t("nav.sessions") || "Live Sessions" },
    { key: "resources", href: "#resources", label: t("nav.resources") || "Resources" },
    { key: "contact", href: "#contact", label: t("nav.contact") || "Contact" },
  ];

  // Track scroll state for enhanced glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-3"
          : "bg-white/70 backdrop-blur-sm border-b border-slate-100/80 py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-12">
        {/* Logo (Left) */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles size={18} />
          </div>
          <span className="font-serif font-extrabold text-2xl tracking-tight text-indigo-950 group-hover:text-indigo-600 transition-colors duration-200">
            AARAMBH
          </span>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200 relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 rounded-full group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Actions (Right) */}
        <div className="hidden lg:flex items-center gap-5">
          <LanguageSwitcher />

          <a
            href="#community"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md shadow-indigo-600/15 hover:shadow-lg hover:shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Users size={16} />
            <span>Join Community</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200/80 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors py-2 border-b border-slate-100"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={16} className="text-slate-400" />
                  </a>
                ))}
              </nav>

              <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-200/60">
                <LanguageSwitcher />

                <a
                  href="#community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95"
                >
                  <Users size={16} />
                  <span>Join Community</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}