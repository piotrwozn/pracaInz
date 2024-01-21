import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div>
            <select onChange={handleLanguageChange} defaultValue={i18n.language}>
                <option value="en">English</option>
                <option value="pl">Polski</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
