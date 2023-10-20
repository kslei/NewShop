import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import uk from './locales/uk.json';

const resources = {
  en,
  ru,
  uk
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language"),
    fallbackLng: window.navigator.language,
    supportedLngs: ['en', 'ru', 'uk'],
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;