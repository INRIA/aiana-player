import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    keySeparator: false,
    react: {
      defaultTransParent: 'span',
      wait: true
    }
  });

export default i18n;
