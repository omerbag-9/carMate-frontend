import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';

// Import translation resources
import translationEN from './Locales/en.json';
import translationAR from './Locales/ar.json';

// Configure i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR }
    },
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'navigator'],
      lookupCookie: 'i18next',
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false
    }
  });

// Function to change language that saves to cookie
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  
  // Set cookie with language preference
  // You can adjust the expiration (7 days in this example)
  Cookies.set('i18next', lng, { expires: 7, path: '/' });
  
  // If RTL/LTR direction matters, you can also set the document direction
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
};

export default i18n;