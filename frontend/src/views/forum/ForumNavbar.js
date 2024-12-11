import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/main/Forum.css';

const ForumNavbar = ({ currentView, setCurrentView }) => {
    const navigate = useNavigate();

    const handleClick = (view) => {
        if (view === 'home') {
            navigate('/welcome');
        } else {
            // Sprawdźmy wartość currentView
            if (currentView === null) {
                // Jesteśmy w TopicDetail - nawiguj do /forum z wybranym widokiem
                navigate('/forum', { state: { view: view } });
            } else {
                // Jesteśmy w Forum - użyj setCurrentView
                setCurrentView(view);
            }
        }
    };

    return (
        <div className="forum-navbar-container">
            <div
                className={`forum-navbar-item ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleClick('home')}
            >
                Strona główna
            </div>
            <div
                className={`forum-navbar-item ${currentView === 'user-topics' ? 'active' : ''}`}
                onClick={() => handleClick('user-topics')}
            >
                Twoje tematy
            </div>
            <div
                className={`forum-navbar-item ${currentView === 'all-topics' ? 'active' : ''}`}
                onClick={() => handleClick('all-topics')}
            >
                Wszystkie tematy
            </div>
            <div
                className={`forum-navbar-item ${currentView === 'related-topics' ? 'active' : ''}`}
                onClick={() => handleClick('related-topics')}
            >
                Powiązane tematy
            </div>
        </div>
    );
};

export default ForumNavbar;
