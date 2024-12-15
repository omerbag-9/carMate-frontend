import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;