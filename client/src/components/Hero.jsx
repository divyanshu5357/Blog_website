import {
  ArrowRight,
  Baby,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import useTypingLoop from "../hooks/useTypingLoop";

function Hero() {
  const { t } = useTranslation();
  const typedWord = useTypingLoop([t("hero.brandWord")]);

  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">{t("hero.eyebrow")}</p>
        <h1 aria-label={t("hero.brandAriaLabel")}>
          <span className="hero-title-accent">{typedWord.slice(0, 1)}</span>
          <span className="hero-title-rest">{typedWord.slice(1)}</span>
          <span className="typing-cursor title-cursor" aria-hidden="true" />
        </h1>
        <p className="tagline evidence-line">{t("hero.tagline")}</p>
        <div className="hero-actions">
          <a className="button primary" href="#blogs">
            {t("hero.exploreArticles")} <ArrowRight size={18} />
          </a>
          <a className="button secondary" href="#live-sessions">
            {t("hero.joinLiveSessions")} <CalendarDays size={18} />
          </a>
        </div>
      </div>
      <div className="hero-visual" aria-label={t("hero.focusAreasAriaLabel")}>
        <div className="focus-card health">
          <HeartPulse size={30} />
          <span>{t("hero.focusCards.health")}</span>
        </div>
        <div className="focus-card education">
          <GraduationCap size={30} />
          <span>{t("hero.focusCards.education")}</span>
        </div>
        <div className="focus-card family">
          <Baby size={30} />
          <span>{t("hero.focusCards.family")}</span>
        </div>
        <div className="focus-card workplace">
          <BriefcaseBusiness size={30} />
          <span>{t("hero.focusCards.workplace")}</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
