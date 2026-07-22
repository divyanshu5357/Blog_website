import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <section className="section split" id="about-aarambh">
      <div>
        <p className="section-kicker">{t("about.kicker")}</p>
        <h2>{t("about.title")}</h2>
      </div>
      <div className="prose">
        <p>{t("about.description1")}</p>
        <p>{t("about.description2")}</p>
        <div className="proof-grid">
          <span><CheckCircle2 size={18} />{t("about.proof.evidenceAware")}</span>
          <span><CheckCircle2 size={18} />{t("about.proof.practical")}</span>
          <span><CheckCircle2 size={18} />{t("about.proof.humanCentred")}</span>
        </div>
      </div>
    </section>
  );
}

export default About;
