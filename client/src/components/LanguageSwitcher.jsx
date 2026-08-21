import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const supportedLanguages = [
  { code: "en", labelKey: "language.options.en", short: "EN" },
  { code: "hi", labelKey: "language.options.hi", short: "HI" },
  { code: "mr", labelKey: "language.options.mr", short: "MR" },
  { code: "ta", labelKey: "language.options.ta", short: "TA" },
  { code: "pa", labelKey: "language.options.pa", short: "PA" },
  { code: "gu", labelKey: "language.options.gu", short: "GU" },
];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const selected = supportedLanguages.some((language) => language.code === i18n.resolvedLanguage)
    ? i18n.resolvedLanguage
    : "en";

  return (
    <div className="relative inline-flex items-center gap-1.5 bg-slate-100/80 hover:bg-indigo-50/80 px-2.5 py-1.5 rounded-full border border-slate-200/60 transition-all cursor-pointer">
      <Globe size={14} className="text-indigo-600 flex-shrink-0" />
      <select
        value={selected}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t("language.ariaLabel") || "Select language"}
        className="bg-transparent text-xs font-semibold text-slate-700 hover:text-indigo-900 cursor-pointer focus:outline-none appearance-none pr-1"
      >
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code} className="bg-white text-slate-800">
            {language.short} - {t(language.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
