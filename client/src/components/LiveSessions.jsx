import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getPublicSessions } from "../api/liveSessionApi";
import RegisterSessionModal from "./RegisterSessionModal";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

function LiveSessions() {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);

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

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "up" ? -180 : 180;
      scrollContainerRef.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#fdf9f4] py-16 md:py-24" id="live-sessions">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-amber-700 uppercase mb-4"
          >
            {t("liveSessions.kicker")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6"
          >
            {t("liveSessions.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            {t("liveSessions.description")}
          </motion.p>
        </div>

        <div className="lg:col-span-7 flex flex-col relative">
          <div
            ref={scrollContainerRef}
            className="flex flex-col gap-4 max-h-[310px] overflow-y-auto pr-2 pb-8 overscroll-contain hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading ? (
              [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center animate-pulse"
                >
                  <div className="w-full sm:w-24 h-40 sm:h-24 bg-gray-200 rounded-xl shrink-0"></div>
                  <div className="w-[64px] h-[64px] bg-gray-200 rounded-xl shrink-0"></div>
                  <div className="flex-1 w-full space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : sessions.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-lg font-medium text-gray-900">
                  No upcoming sessions.
                </p>
                <p className="text-gray-500 mt-1">
                  Check back later for new events.
                </p>
              </div>
            ) : (
              sessions.map((session, index) => {
                const dateObj = new Date(session.date);
                const day = dateObj.toLocaleDateString("en-GB", {
                  day: "2-digit",
                });
                const month = dateObj.toLocaleDateString("en-GB", {
                  month: "short",
                });

                return (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all duration-300 group shrink-0"
                    key={session.id}
                  >
                    {session.image && (
                      <img
                        src={session.image}
                        alt={session.title}
                        className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-xl shrink-0"
                      />
                    )}

                    <div className="flex flex-col items-center justify-center bg-violet-50 text-violet-700 rounded-xl min-w-[64px] h-[64px] shrink-0 border border-violet-100">
                      <span className="text-xl font-black leading-none">
                        {day}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
                        {month}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug line-clamp-2 group-hover:text-violet-700 transition-colors">
                        {session.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium line-clamp-1">
                        {session.speaker}
                      </p>
                    </div>

                    <button
                      className="w-full sm:w-auto shrink-0 bg-white border-2 border-violet-600 text-violet-700 hover:bg-violet-600 hover:text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors mt-2 sm:mt-0"
                      onClick={() => openRegisterModal(session)}
                    >
                      {t("liveSessions.register")}
                    </button>
                  </motion.article>
                );
              })
            )}
          </div>

          {sessions.length > 2 && (
            <div className="pointer-events-none absolute bottom-[60px] left-0 right-2 h-16 bg-gradient-to-t from-[#fdf9f4] to-transparent z-10" />
          )}

          {sessions.length > 2 && (
            <div className="flex justify-center items-center gap-4 mt-4 relative z-20">
              <button
                onClick={() => scroll("up")}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50 shadow-sm transition-all"
                aria-label="Scroll Up"
              >
                <ChevronUp size={20} />
              </button>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Scroll
              </span>
              <button
                onClick={() => scroll("down")}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50 shadow-sm transition-all"
                aria-label="Scroll Down"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          )}
        </div>
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