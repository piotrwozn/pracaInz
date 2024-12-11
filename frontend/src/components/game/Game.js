import React, { useContext, useEffect } from 'react';
import { LobbyContext } from '../../contexts/LobbyContext';
import { useNavigate } from 'react-router-dom';
import GameChat from './GameChat';
import DiceRoll from './DiceRoll';
import '../../styles/main/Game.css';
import ConnectedUsers from "./ConnectedUsers";

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

    const sessionId = currentLobby.id;

    const handleLeaveGame = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/lobby/leave', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lobbyId: sessionId }),
        })
            .then(response => {
                if (response.ok) {
                    navigate('/your-lobbies');
                } else {
                    console.error('Error leaving the lobby');
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    };

    return (
        <div className="game-page">
            <div className="header">
                <h1>Witamy w {currentLobby.name}</h1>
                <button className="leave-game-button" onClick={handleLeaveGame}>
                    Opuść to lobby na zawsze
                </button>
            </div>
            <GameChat sessionId={sessionId} />
            <DiceRoll />
            <ConnectedUsers sessionId={sessionId} />
        </div>
    );
}

export default Game;
