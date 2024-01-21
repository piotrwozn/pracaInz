import React, { useEffect, useState } from 'react';
import '../../styles/main/MainPage.css';
import {useNavigate} from "react-router-dom";
import signUpImage from '../../assets/icons/signUp.png';
import loginImage from '../../assets/icons/login.png';

const MainPage = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();
    const [slideAnimation, setSlideAnimation] = useState(false);
    const [animateSignUp, setAnimateSignUp] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFadeIn(true);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleMouseMove = (e) => {
        const { clientX } = e;

        const boundary = window.innerWidth / 2;

        setShowLogin(clientX < boundary);
        setShowRegister(clientX >= boundary);
    };

    const handleClick = (e) => {
        const { clientX } = e;

        const boundary = window.innerWidth / 2;

        if (clientX < boundary) {
            setSlideAnimation(true);
            setTimeout(() => {
                navigate('/login');
            }, 500);
        } else {
            setAnimateSignUp(true);
            setTimeout(() => {
                navigate('/signup');
            }, 500);
        }
    };

    return (
        <div className={`app-container ${fadeIn ? 'fade-in' : ''}`}
        onMouseMove={handleMouseMove}
        onClick={handleClick}>
            <div className={`${slideAnimation ? 'background-slide-out' : ''} ${animateSignUp ? 'background-signup-slide-out' : ''}`}>
            {showLogin && (
                <div className="login-message"><img src={loginImage} alt="LOGIN" className="login"/></div>
            )}
            {showRegister && (
                <div className="register-message"><img src={signUpImage} alt="SIGN UP" className="sign-up"/></div>
            )}
            </div>
            {slideAnimation && <div className="background-slide-in"></div>}
            {animateSignUp && <div className="background-signup-slide-in"></div>}
        </div>
    );
};

export default MainPage;
