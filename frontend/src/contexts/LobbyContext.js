
import React, { createContext, useState } from 'react';

export const LobbyContext = createContext();

export const LobbyProvider = ({ children }) => {
    const [currentLobby, setCurrentLobby] = useState(null);

    return (
        <LobbyContext.Provider value={{ currentLobby, setCurrentLobby }}>
            {children}
        </LobbyContext.Provider>
    );
};
