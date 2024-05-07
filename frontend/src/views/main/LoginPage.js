import '../../styles/main/LoginPage.css';
import {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../utils/LanguageSwitcher";
import {useNavigate} from "react-router-dom";
const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setUserDetails({...userDetails, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        let newErrors = {};
        if (!userDetails.username.trim()) newErrors.username = t('Username null');
        else if (userDetails.username.trim().length < 3) newErrors.username = t('Username too short');

        if (!userDetails.password.trim()) newErrors.password = t('Password null');
        else if (userDetails.password.trim().length < 6) newErrors.password = t('Password too short');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            try {
                const response = await fetch('http://localhost:8080/api/auth/authenticate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDetails),
                });

                const data = await response.json();

                localStorage.setItem('token', data.token.trim());
                navigate("/welcome")

            } catch (error) {
                setErrors({ ...errors, username: t('WrongDetails')});
            }
        }
    }


    return(
        <div className="login-page">
            <div className="language-switcher">
                <LanguageSwitcher />
            </div>
            <div className={`login-form-container ${isVisible ? 'visible' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {errors.username && <p className = {`error ${errors.username ? 'show' : ''}`}>{errors.username}</p>}
                        <label htmlFor="username">{t('Username')}</label>
                        <input type="text" name="username" value={userDetails.username} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        {errors.password && <p className = {`error ${errors.password ? 'show' : ''}`}>{errors.password}</p>}
                        <label htmlFor="password">{t('Password')}</label>
                        <input type="password" name="password" value={userDetails.password} onChange={handleChange} />
                    </div>
                    <button type="submit">{t('Log In')}</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;