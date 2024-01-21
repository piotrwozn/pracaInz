import React, {useRef, useState} from 'react';
import '../../styles/main/HomePage.css';
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const glowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);


    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
                navigate("/mainPage")
            },
            4000);
    };

    const handleMouseMove = (e) => {
        if (glowRef.current) {
            const rect = e.target.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = centerX - mouseX;
            const deltaY = centerY - mouseY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

            const scale = 1 - distance / maxDistance;

            glowRef.current.style.width = `${100 + scale * 100}px`;
            glowRef.current.style.height = `${100 + scale * 100}px`;
            glowRef.current.style.opacity = `${0.6 + scale * 0.4}`;
            glowRef.current.style.background = `radial-gradient(circle, rgba(64, 224, 208, ${0.6 + scale * 10}), transparent)`;
        }
    };



    return (
        <div
            className={`portal-background ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div ref={glowRef} className="glow-effect"></div>
        </div>
    );
};

export default HomePage;