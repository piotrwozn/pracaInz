// src/components/game/Game.js
import React, { useContext, useEffect } from 'react';
import { LobbyContext } from '../../contexts/LobbyContext';
import { useNavigate } from 'react-router-dom';

function Game() {
    const { currentLobby } = useContext(LobbyContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentLobby) {
            // Redirect to lobbies if no lobby is set
            navigate('/your-lobbies');
        }
    }, [currentLobby, navigate]);

    if (!currentLobby) {
        return null; // Lub wyświetl komunikat ładowania
    }

    return (
        <div className="game-page">
            <h1>Welcome to {currentLobby.name}</h1>
            {/* Implementuj logikę gry tutaj */}
        </div>
    );
}

export default Game;
