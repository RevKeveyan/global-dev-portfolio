import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';
import am from './locales/am.json';

export const SUPPORTED_LANGUAGES = ['en', 'ru', 'am'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  ru: 'Русский',
  am: 'Հայերdelays'
};

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  am: '🇦🇲'
};

const savedLanguage = localStorage.getItem('language') as SupportedLanguage | null;
const browserLanguage = navigator.language.split('-')[0] as SupportedLanguage;
const defaultLanguage = savedLanguage || (SUPPORTED_LANGUAGES.includes(browserLanguage) ? browserLanguage : 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      am: { translation: am }
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export const changeLanguage = (lang: SupportedLanguage) => {
  localStorage.setItem('language', lang);
  i18n.changeLanguage(lang);
};

export default i18n;
