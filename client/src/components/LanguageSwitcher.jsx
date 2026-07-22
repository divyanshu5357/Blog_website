import { useTranslation } from "react-i18next";

const supportedLanguages = [
  { code: "en", labelKey: "language.options.en" },
  { code: "hi", labelKey: "language.options.hi" },
  { code: "mr", labelKey: "language.options.mr" },
  { code: "ta", labelKey: "language.options.ta" },
  { code: "pa", labelKey: "language.options.pa" },
  { code: "gu", labelKey: "language.options.gu" },
];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const selected = supportedLanguages.some((language) => language.code === i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : "en";

  return (
    <div className="language-switcher">
      <span>{t("language.label")}</span>
      <select value={selected} onChange={(e) => i18n.changeLanguage(e.target.value)} aria-label={t("language.ariaLabel")}>
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {t(language.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
