import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/common.json";
import gu from "../locales/gu/common.json";
import hi from "../locales/hi/common.json";
import mr from "../locales/mr/common.json";
import pa from "../locales/pa/common.json";
import ta from "../locales/ta/common.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en },
			hi: { translation: hi },
			mr: { translation: mr },
			ta: { translation: ta },
			pa: { translation: pa },
			gu: { translation: gu },
		},
		fallbackLng: "en",
		supportedLngs: ["en", "hi", "mr", "ta", "pa", "gu"],
		load: "languageOnly",
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
			lookupLocalStorage: "i18nextLng",
		},
		interpolation: {
			escapeValue: false,
		},
		returnEmptyString: false,
	});

export default i18n;
