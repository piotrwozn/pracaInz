// src/components/game/ConnectedUsers.js

import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

function ConnectedUsers({ sessionId }) {
    const [users, setUsers] = useState([]);
    const nodeRef = useRef(null);

    useEffect(() => {
        fetchConnectedUsers();

        // Opcjonalnie: ustawienie interwału do automatycznego odświeżania
        const intervalId = setInterval(fetchConnectedUsers, 5000); // odśwież co 5 sekund

        return () => {
            clearInterval(intervalId);
        };
    }, [sessionId]);

    const fetchConnectedUsers = () => {
        fetch('/api/connected-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(sessionId),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd sieci');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Error fetching connected users:', error));
    };


    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: 200, y: 100 }}
            cancel="input,textarea,select,option,button,label"
        >
            <div className="connected-users" ref={nodeRef}>
                <h2>Podłączeni użytkownicy</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id.username}>{user.id.username}</li>
                    ))}
                </ul>
                <button onClick={fetchConnectedUsers}>Odśwież</button>
            </div>
        </Draggable>
    );
}

export default ConnectedUsers;
