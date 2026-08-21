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
    <div className="relative inline-flex items-center gap-2 bg-[#4A2B4D]/5 hover:bg-[#4A2B4D]/10 px-3 py-1.5 rounded-full border border-[#4A2B4D]/15 transition-all cursor-pointer">
      <Globe size={14} className="text-[#4A2B4D] flex-shrink-0" />
      <select
        value={selected}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t("language.ariaLabel") || "Select language"}
        className="bg-transparent text-xs font-semibold text-[#4A2B4D] cursor-pointer focus:outline-none pr-1"
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
