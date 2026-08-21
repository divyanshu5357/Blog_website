import React from "react";
import { Menu, X, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleSubscribeClick = (e) => {
    e.preventDefault();
    setOpen(false);
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  const navLinks = [
    { key: "home", href: "#home", label: t("nav.home") || "Home" },
    { key: "about", href: "#about-aarambh", label: t("nav.about") || "About AARAMBH" },
    { key: "blogs", href: "#blogs", label: t("nav.blogs") || "Blogs" },
    { key: "sessions", href: "#live-sessions", label: t("nav.sessions") || "Live Sessions" },
    { key: "resources", href: "#resources", label: t("nav.resources") || "Resources" },
    { key: "contact", href: "#contact", label: t("nav.contact") || "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="sticky top-0 w-full z-50 bg-[#fefaf8]/95 backdrop-blur-md border-b border-[#4A2B4D]/10 shadow-xs py-3 md:py-3.5"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex justify-between items-center gap-4">
        {/* Logo (Left) */}
        <div className="flex-shrink-0 mr-4 xl:mr-8">
          <a href="#home" aria-label={t("brand.homeAriaLabel")} className="block">
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#4A2B4D] tracking-tight whitespace-nowrap">
              {t("brand.title")}
            </h1>
          </a>
        </div>

        {/* Desktop Navigation (Center & Right) */}
        <nav className="hidden lg:flex items-center justify-end flex-1 gap-5 xl:gap-7" aria-label={t("nav.primaryNavigation")}>
          {navLinks.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-[#4A2B4D] font-semibold text-sm xl:text-[15px] hover:text-amber-600 transition-colors whitespace-nowrap leading-none"
            >
              {item.label}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center ml-1 xl:ml-2">
            <LanguageSwitcher />
          </div>

          {/* Compact Subscribe CTA */}
          <a
            href="#contact"
            onClick={handleSubscribeClick}
            className="inline-flex items-center gap-1.5 bg-[#4A2B4D] hover:bg-[#361f38] text-white font-semibold text-xs xl:text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-colors shadow-xs leading-none"
          >
            <Mail size={14} className="text-amber-400" />
            <span>Subscribe</span>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-[#4A2B4D] hover:bg-[#4A2B4D]/5 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
          type="button"
          aria-label={t("nav.toggleNavigation")}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-[#fefaf8] border-b border-[#4A2B4D]/10"
          >
            <nav className="flex flex-col px-5 py-5 gap-3.5">
              {navLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-semibold text-[#4A2B4D] hover:text-amber-600 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-[#4A2B4D]/10 flex items-center justify-between gap-4">
                <LanguageSwitcher />

                <a
                  href="#contact"
                  onClick={handleSubscribeClick}
                  className="inline-flex items-center gap-1.5 bg-[#4A2B4D] hover:bg-[#361f38] text-white font-semibold text-xs px-4 py-2 rounded-full whitespace-nowrap transition-colors shadow-xs"
                >
                  <Mail size={14} className="text-amber-400" />
                  <span>Subscribe</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;