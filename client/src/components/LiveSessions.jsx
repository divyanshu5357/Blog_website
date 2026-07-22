import { sessions } from "../data/sessions";
import { useTranslation } from "react-i18next";

function LiveSessions() {
  const { t } = useTranslation();

  return (
    <section className="section split" id="live-sessions">
      <div>
        <p className="section-kicker">{t("liveSessions.kicker")}</p>
        <h2>{t("liveSessions.title")}</h2>
        <p className="muted">{t("liveSessions.description")}</p>
      </div>
      <div className="session-list">
        {sessions.map((session) => (
          <article className="session-row" key={session.key}>
            <time>{t(`liveSessions.items.${session.key}.date`)}</time>
            <div>
              <h3>{t(`liveSessions.items.${session.key}.title`)}</h3>
              <p>{t(`liveSessions.items.${session.key}.host`)} - {t(`liveSessions.items.${session.key}.mode`)}</p>
            </div>
            <a href="#contact" aria-label={t("liveSessions.registerAria", { title: t(`liveSessions.items.${session.key}.title`) })}>{t("liveSessions.register")}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LiveSessions;
