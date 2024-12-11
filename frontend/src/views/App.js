// src/views/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../utils/i18n';
import HomePage from './main/HomePage';
import MainPage from './main/MainPage';
import LoginPage from './main/LoginPage';
import SignUpPage from './main/SignUpPage';
import WelcomePage from './user/WelcomePage';
import UserDetailsPage from './user/UserDetailsPage';
import PublicLobbiesPage from './lobby/PublicLobbiesPage';
import YourLobbiesPage from './lobby/YourLobbiesPage';
import { LobbyProvider } from '../contexts/LobbyContext';
import Game from '../components/game/Game';
import PrivateRoute from '../components/PrivateRoute';
import Forum from './forum/Forum';
import TopicDetail from './forum/TopicDetail';

function App() {
    return (
        <LobbyProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mainPage" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/user-details" element={<UserDetailsPage />} />
                    <Route path="/public-lobbies" element={<PublicLobbiesPage />} />
                    <Route path="/your-lobbies" element={<YourLobbiesPage />} />
                    <Route
                        path="/game"
                        element={
                            <PrivateRoute>
                                <Game />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/forum" element={<Forum/>}/>
                    <Route path="/forum/topic" element={<TopicDetail />} />
                </Routes>
            </Router>
        </LobbyProvider>
    );
}

export default App;
