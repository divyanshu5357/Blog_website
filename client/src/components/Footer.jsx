import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#fefaf8] border-t border-[#4A2B4D]/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Tagline */}
          <div className="lg:col-span-2">
            <a className="block mb-6 group" href="#home">
              <span className="block text-3xl font-serif font-extrabold text-[#4A2B4D] tracking-tight leading-tight group-hover:text-amber-600 transition-colors">
                {t("brand.title")}
              </span>
              <span className="text-xs md:text-sm font-medium text-gray-500 mt-2 block max-w-sm leading-relaxed">
                {t("brand.description")}
              </span>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <h4 className="text-[#4A2B4D] font-bold tracking-wider uppercase text-sm mb-6 border-b border-[#4A2B4D]/10 pb-3 inline-block">
              Explore
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#about-aarambh" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
                {t("footer.links.about")}
              </a>
              <a href="#blogs" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
                {t("footer.links.blogs")}
              </a>
              <a href="#live-sessions" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
                {t("footer.links.liveSessions")}
              </a>
            </div>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <h4 className="text-[#4A2B4D] font-bold tracking-wider uppercase text-sm mb-6 border-b border-[#4A2B4D]/10 pb-3 inline-block">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#resources" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
                {t("footer.links.resources")}
              </a>
              <a href="#community" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
                {t("footer.links.community")}
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-[#4A2B4D]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p className="text-center md:text-left">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#4A2B4D] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#4A2B4D] transition-colors">Terms of Service</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;