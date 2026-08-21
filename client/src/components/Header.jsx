import { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribeClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fefaf8]/95 backdrop-blur-md border-b border-[#4A2B4D]/15 shadow-sm py-4"
          : "bg-[#fefaf8]/90 backdrop-blur-sm border-b border-[#4A2B4D]/10 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10">
        {/* Brand Text Logo - Larger & Refined */}
        <a href="#home" className="group flex items-center">
          <span className="font-serif font-extrabold text-3xl md:text-4xl tracking-tight text-[#4A2B4D] group-hover:text-amber-600 transition-colors duration-300">
            AARAMBH
          </span>
        </a>

        {/* Center Navigation Links - Larger Text & Smooth Hover Animations */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
          {navLinks.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="relative py-1.5 text-[16px] xl:text-[17px] font-bold text-[#4A2B4D] hover:text-amber-600 transition-colors duration-300 group flex items-center gap-1"
            >
              <span className="group-hover:-translate-y-0.5 transition-transform duration-200 block">
                {item.label}
              </span>
              {/* Smooth Animated Indicator Bar */}
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Actions (Right) */}
        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />

          {/* Attractive High-Contrast Subscribe Button */}
          <a
            href="#contact"
            onClick={handleSubscribeClick}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#4A2B4D] via-[#5D3261] to-[#4A2B4D] text-white font-bold text-sm md:text-[15px] px-6 py-2.5 rounded-full shadow-md shadow-[#4A2B4D]/20 hover:shadow-lg hover:shadow-[#4A2B4D]/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Mail size={17} className="text-amber-400" />
            <span className="text-white font-bold tracking-wide">Subscribe</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-[#4A2B4D] hover:bg-[#4A2B4D]/10 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#fefaf8] border-b border-[#4A2B4D]/15 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 space-y-5">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-bold text-[#4A2B4D] hover:text-amber-600 transition-colors py-2 border-b border-[#4A2B4D]/10 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-4 flex items-center justify-between gap-4 border-t border-[#4A2B4D]/15">
                <LanguageSwitcher />

                <a
                  href="#contact"
                  onClick={handleSubscribeClick}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A2B4D] to-[#5D3261] text-white font-bold text-base px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Mail size={17} className="text-amber-400" />
                  <span className="text-white font-bold">Subscribe</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}