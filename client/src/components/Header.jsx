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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fefaf8]/95 backdrop-blur-md border-b border-[#4A2B4D]/15 shadow-sm py-3.5"
          : "bg-[#fefaf8]/90 backdrop-blur-sm border-b border-[#4A2B4D]/10 py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8">
        {/* Brand Text Logo (Left) - Clean & Elegant Text Only */}
        <a href="#home" className="group">
          <span className="font-serif font-extrabold text-2xl md:text-3xl tracking-tight text-[#4A2B4D] group-hover:text-amber-600 transition-colors duration-200">
            AARAMBH
          </span>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-semibold text-[#4A2B4D]/80 hover:text-amber-600 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions (Right) */}
        <div className="hidden lg:flex items-center gap-5">
          <LanguageSwitcher />

          {/* High Contrast Primary CTA Button redirecting to Subscribe section */}
          <a
            href="#contact"
            onClick={handleSubscribeClick}
            className="inline-flex items-center gap-2 bg-[#4A2B4D] hover:bg-[#361f38] text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Mail size={15} className="text-amber-400" />
            <span className="text-white font-semibold">Subscribe</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#4A2B4D] hover:bg-[#4A2B4D]/5 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-[#fefaf8] border-b border-[#4A2B4D]/15 overflow-hidden shadow-lg"
          >
            <div className="px-5 py-5 space-y-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-[#4A2B4D] hover:text-amber-600 transition-colors py-2 border-b border-[#4A2B4D]/5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-3 flex items-center justify-between gap-4 border-t border-[#4A2B4D]/10">
                <LanguageSwitcher />

                <a
                  href="#contact"
                  onClick={handleSubscribeClick}
                  className="inline-flex items-center gap-2 bg-[#4A2B4D] hover:bg-[#361f38] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Mail size={15} className="text-amber-400" />
                  <span className="text-white font-semibold">Subscribe</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}