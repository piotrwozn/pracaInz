import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Username": "Username:",
            "Password": "Password:",
            "Log In": "Log In",
            "Sign Up": "Sign Up",
            "Username null": "Username is required.",
            "Password null": "Password is required.",
            "Email null": "Email is required.",
            "Username too short": "Username must be at least 3 characters long.",
            "Password too short": "Password must be at least 6 characters long.",
            "Invalid email": "Email is invalid.",
            "UsernameTaken": "This username is already taken",
            "EmailTaken": "This email is already taken",
            "WrongDetails": "Wrong username or password"
        }
    },
    pl: {
        translation: {
            "Username": "Nazwa użytkownika:",
            "Password": "Hasło:",
            "Log In": "Zaloguj się",
            "Sign Up": "Zarejestruj się",
            "Username null": "Nazwa użytkownika jest wymagana.",
            "Password null": "Hasło jest wymagane.",
            "Email null": "Email jest wymagany.",
            "Username too short": "Nazwa użytkownika musi składać się z co najmniej 3 znaków.",
            "Password too short": "Hasło musi składać się z co najmniej 6 znaków.",
            "Invalid email": "Adres e-mail jest nieprawidłowy.",
            "UsernameTaken": "Ta nazwa użytkownika jest już zajęta",
            "EmailTaken": "Ten email jest już zajęty",
            "WrongDetails": "Zła nazwa użytkownika lub hasło"
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