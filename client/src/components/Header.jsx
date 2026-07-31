import React from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navItems } from "../data/navItems";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      // Using a warm, soft background color to match the images
      className="fixed top-0 w-full z-50 bg-[#fefaf8]/95 backdrop-blur-md border-b border-[#4A2B4D]/10 shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-5 py-4 flex justify-between items-center gap-4 xl:gap-8">
        
        {/* Logo Block - Adjusted width and removed line-clamp so text wraps perfectly to 3 lines */}
        <div className="flex-shrink-0 w-[260px] md:w-[380px] xl:w-[480px]">
          <a href="#home" aria-label={t("brand.homeAriaLabel")} className="block">
            <h1 className="text-xl md:text-2xl xl:text-3xl font-serif font-bold text-[#4A2B4D] tracking-tight leading-tight mb-1.5 md:mb-2">
              {t("brand.title")}
            </h1>
            <p className="text-[11px] xl:text-[13.5px] text-slate-500 font-medium leading-relaxed hidden md:block">
              {t("brand.description")}
            </p>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-end flex-1 gap-6 xl:gap-8" aria-label={t("nav.primaryNavigation")}>
          {/* Filtering out the 'community' item dynamically */}
          {navItems.filter(item => item.key !== "community").map((item) => (
            <motion.a 
              key={item.key} 
              href={item.href}
              whileHover={{ y: -2, color: "#d97706" }} // Amber hover effect
              className="text-[#4A2B4D] font-semibold transition-colors relative flex items-center gap-1.5 whitespace-nowrap text-sm xl:text-[15px]"
            >
              {t(`nav.${item.key}`)}
            </motion.a>
          ))}
          
          {/* Vertical Separator line matching the image */}
          <div className="pl-4 xl:pl-6 border-l border-gray-300 h-8 flex items-center">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-[#4A2B4D] hover:bg-[#4A2B4D]/5 rounded-lg transition-colors flex-shrink-0"
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
            <nav className="flex flex-col px-5 py-6 gap-4">
              {navItems.filter(item => item.key !== "community").map((item) => (
                <a 
                  key={item.key} 
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-semibold text-[#4A2B4D] hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-200">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;