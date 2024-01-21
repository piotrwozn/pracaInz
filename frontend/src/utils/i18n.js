import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Username": "Username:",
            "Password": "Password:",
            "Log In": "Log In",
            "Sign Up": "Sign Up"
        }
    },
    pl: {
        translation: {
            "Username": "Nazwa użytkownika:",
            "Password": "Hasło:",
            "Log In": "Zaloguj się",
            "Sign Up": "Zarejestruj się"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;