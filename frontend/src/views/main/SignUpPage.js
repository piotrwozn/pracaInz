import "../../styles/main/SignUpPage.css";
import "../../styles/main/LoginPage.css";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../utils/LanguageSwitcher";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const {t} = useTranslation();
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isChangingBackground, setIsChangingBackground] = useState(false);
    const [errors, setErrors] = useState({});

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

        if (!userDetails.email.trim()) newErrors.email = t('Email null');
        else if(!/\S+@\S+\.\S+/.test(userDetails.email)) newErrors.email = t('Invalid email');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            try {
                const response = await fetch('http://localhost:8080/api/auth/register', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                    body: JSON.stringify(userDetails),
                });

                const data = await response.json();

                if(data.token === "UsernameTaken") {
                    errors.username = t('UsernameTaken');
                } else if (data.token === "EmailTaken") {
                    errors.email = t('EmailTaken');
                } else {
                    setIsVisible(false);
                    setIsChangingBackground(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
            } catch (error) {
                console.error('There was an error submitting the form:', error);
            }
        }
    }

    return (
        <div className={`signup-page ${isChangingBackground ? 'changing-background' : ''}`}>
            <div className="language-switcher">
                <LanguageSwitcher/>
            </div>
            <div className={`login-form-container ${isVisible ? 'visible' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {errors.username && <p className = {`error ${errors.username ? 'show' : ''}`}>{errors.username}</p>}
                        <label htmlFor="username">{t('Username')}</label>
                        <input type="text" name="username" value={userDetails.username} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        {errors.email && <p className = {`error ${errors.email ? 'show' : ''}`}>{errors.email}</p>}
                        <label htmlFor="email">{t('Email')}</label>
                        <input type="text" name="email" value={userDetails.email} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        {errors.password && <p className = {`error ${errors.password ? 'show' : ''}`}>{errors.password}</p>}
                        <label htmlFor="password">{t('Password')}</label>
                        <input type="password" value={userDetails.password} name="password" onChange={handleChange}/>
                    </div>
                    <button type="submit">{t('Sign Up')}</button>
                </form>
            </div>
        </div>
    )
}
export default SignUpPage;