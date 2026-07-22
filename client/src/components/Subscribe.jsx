import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

function Subscribe() {
  const { t } = useTranslation();

  return (
    <section className="subscribe" id="contact">
      <div>
        <p className="section-kicker">{t("subscribe.kicker")}</p>
        <h2>{t("subscribe.title")}</h2>
      </div>
      <form className="subscribe-form">
        <label htmlFor="email">{t("subscribe.emailLabel")}</label>
        <div>
          <input id="email" type="email" placeholder={t("subscribe.emailPlaceholder")} />
          <button className="button primary" type="submit">
            {t("subscribe.button")} <Mail size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}

export default Subscribe;
