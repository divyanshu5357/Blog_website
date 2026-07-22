import { mostRead } from "../data/mostRead";
import { useTranslation } from "react-i18next";

function MostRead() {
  const { t } = useTranslation();

  return (
    <section className="section compact">
      <div className="section-heading">
        <p className="section-kicker">{t("mostRead.kicker")}</p>
        <h2>{t("mostRead.title")}</h2>
      </div>
      <ol className="most-read">
        {mostRead.map((item) => <li key={item}>{t(`mostRead.items.${item}`)}</li>)}
      </ol>
    </section>
  );
}

export default MostRead;
