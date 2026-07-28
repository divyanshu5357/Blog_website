import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPublicSessions } from "../api/liveSessionApi";
import RegisterSessionModal from "./RegisterSessionModal";
function LiveSessions() {
  const { t } = useTranslation();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await getPublicSessions();
      setSessions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
const openRegisterModal = (session) => {
  setSelectedSession(session);
  setModalOpen(true);
};
  return (
    <section className="section split" id="live-sessions">
      <div>
        <p className="section-kicker">
          {t("liveSessions.kicker")}
        </p>

        <h2>{t("liveSessions.title")}</h2>

        <p className="muted">
          {t("liveSessions.description")}
        </p>
      </div>

      <div className="session-list">
        {loading ? (
          <p>Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p>No upcoming sessions.</p>
        ) : (
          sessions.map((session) => (
            <article
              className="session-row"
              key={session.id}
            >
              <time>
                {new Date(session.date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}
              </time>

              <div>
                <h3>{session.title}</h3>

                <p>{session.speaker}</p>
              </div>

              <button
  className="register-btn"
  onClick={() =>
    openRegisterModal(session)
  }
>
  {t("liveSessions.register")}
</button>
            </article>
          ))
        )}
      </div>
      <RegisterSessionModal
  open={modalOpen}
  session={selectedSession}
  onClose={() => {
    setModalOpen(false);
    setSelectedSession(null);
  }}
/>
    </section>
  );
}

export default LiveSessions;