import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import hi from "./locales/hi/common.json";
import mr from "./locales/mr/common.json";
import ta from "./locales/ta/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      hi: {
        translation: hi,
      },
      mr: {
        translation: mr,
      },
      ta: {
        translation: ta,
      },
    },

    fallbackLng: "en",
    lng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;