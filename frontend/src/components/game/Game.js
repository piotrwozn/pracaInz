// src/components/game/Game.js

import React, { useContext, useEffect } from 'react';
import { LobbyContext } from '../../contexts/LobbyContext';
import { useNavigate } from 'react-router-dom';
import GameChat from './GameChat';
import DiceRoll from './DiceRoll'; // Importujemy nowy komponent
import '../../styles/main/Game.css';
import ConnectedUsers from "./ConnectedUsers"; // Importujemy styl dla tła

function Game() {
    const { currentLobby } = useContext(LobbyContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentLobby) {
            navigate('/your-lobbies');
        }
    }, [currentLobby, navigate]);

    if (!currentLobby) {
        return null;
    }

    const sessionId = currentLobby.id; // Pobieramy sessionId z currentLobby

    return (
        <div className="game-page">
            <h1>Witamy w {currentLobby.name}</h1>
            <GameChat sessionId={sessionId} /> {/* Komponent czatu */}
            <DiceRoll /> {/* Komponent rzutów kośćmi */}
            <ConnectedUsers sessionId={sessionId} />
        </div>
    );
}

export default Game;
