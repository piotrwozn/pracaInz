import "../../styles/main/SignUpPage.css";
import "../../styles/main/LoginPage.css";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../utils/LanguageSwitcher";

const SignUpPage = () => {

    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return(
        <div className="signup-page">
            <div className="language-switcher">
                <LanguageSwitcher />
            </div>
            <div className={`login-form-container ${isVisible ? 'visible' : ''}`}>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">{t('Username')}</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">{t('Email')}</label>
                        <input type="text" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{t('Password')}</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">{t('Sign Up')}</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;