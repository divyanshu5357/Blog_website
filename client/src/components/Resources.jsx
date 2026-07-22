import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resources } from "../data/resources";

function Resources() {
  const { t } = useTranslation();

  return (
    <section className="section resources" id="resources">
      <div>
        <p className="section-kicker">{t("resources.kicker")}</p>
        <h2>{t("resources.title")}</h2>
      </div>
      <div className="resource-grid">
        {resources.map((resource) => (
          <a className="resource-card" href="#contact" key={resource}>
            <Download size={22} />
            <span>{t(`resources.items.${resource}`)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Resources;
