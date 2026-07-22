import React from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navItems } from "../data/navItems";
import LanguageSwitcher from "./LanguageSwitcher";

function Header() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label={t("brand.homeAriaLabel")}>
        <span className="brand-title">{t("brand.title")}</span>
        <span className="brand-description">{t("brand.description")}</span>
      </a>
      <button className="menu-button" type="button" aria-label={t("nav.toggleNavigation")} onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? "nav open" : "nav"} aria-label={t("nav.primaryNavigation")}>
        {navItems.map((item) => (
          <a key={item.key} href={item.href}>
            {t(`nav.${item.key}`)}
            {item.key === "community" && <span className="soon">{t("nav.future")}</span>}
          </a>
        ))}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}

export default Header;
