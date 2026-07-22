import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div>
        <a className="brand" href="#home">
          <span className="brand-title">{t("brand.title")}</span>
          <span className="brand-description">{t("brand.description")}</span>
        </a>
        <p>{t("footer.tagline")}</p>
      </div>
      <div className="footer-links">
        <a href="#about-aarambh">{t("footer.links.about")}</a>
        <a href="#blogs">{t("footer.links.blogs")}</a>
        <a href="#live-sessions">{t("footer.links.liveSessions")}</a>
        <a href="#resources">{t("footer.links.resources")}</a>
        <a href="#community">{t("footer.links.community")}</a>
      </div>
      <p className="copyright">{t("footer.copyright")}</p>
    </footer>
  );
}

export default Footer;
