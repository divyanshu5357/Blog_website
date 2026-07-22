import { UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";

function Community() {
  const { t } = useTranslation();

  return (
    <section className="section community" id="community">
      <UsersRound size={34} />
      <div>
        <p className="section-kicker">{t("community.kicker")}</p>
        <h2>{t("community.title")}</h2>
        <p className="muted">{t("community.description")}</p>
      </div>
    </section>
  );
}

export default Community;
