// src/components/lobby/YourLobbiesPage.js
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../main/Navbar';
import '../../styles/main/YourLobbies.css';
import addLobbyPopUpImage from '../../assets/images/addLobbiePopUp.png';
import { useNavigate } from 'react-router-dom';
import { LobbyContext } from '../../contexts/LobbyContext';

function YourLobbiesPage() {
    const [lobbies, setLobbies] = useState([]);
    const [errors, setErrors] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // State dla danych formularza nowego lobby
    const [formData, setFormData] = useState({
        name: '', description: '', isPublic: true, password: '',
    });

    // State dla błędów walidacji formularza
    const [formErrors, setFormErrors] = useState({});

    // State dla hasła do dołączenia do lobby
    const [joinPassword, setJoinPassword] = useState('');

    const { setCurrentLobby } = useContext(LobbyContext);
    const navigate = useNavigate();

    const fetchYourLobbies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/lobby/usersLobby', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                if (errorText.startsWith("Error")) {
                    throw new Error('Failed to fetch your lobbies');
                }
            }

            const data = await response.json();
            setLobbies(data);
        } catch (error) {
            setErrors('Failed to fetch your lobbies');
        }
    };

    useEffect(() => {
        fetchYourLobbies();
    }, []);

    const handleJoinLobby = async (lobbyId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/lobby/join', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lobbyId }),
            });

            if (!response.ok) {
                throw new Error('Failed to join lobby');
            }

            const lobby = lobbies.find(l => l.id === lobbyId);
            if (lobby) {
                setCurrentLobby(lobby);
                navigate('/game');
            } else {
                setErrors('Lobby not found');
            }
        } catch (error) {
            setErrors('Failed to join lobby');
        }
    };

    const handleJoinLobbyWithPassword = async () => {
        const lobbyId = lobbies.length > 0 ? lobbies[0].id : null;
        if (!lobbyId) {
            setErrors('No lobby to join');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/lobby/join', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lobbyId, password: joinPassword }),
            });

            if (!response.ok) {
                throw new Error('Failed to join lobby with password');
            }

            const lobby = lobbies.find(l => l.id === lobbyId);
            if (lobby) {
                setCurrentLobby(lobby);
                navigate('/game');
            } else {
                setErrors('Lobby not found');
            }
        } catch (error) {
            setErrors('Failed to join lobby with password');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!formData.name || formData.name.trim().length < 1 || formData.name.length > 100) {
            errors.name = 'Name is required and must be between 1 and 100 characters';
        }

        if (formData.description && formData.description.length > 500) {
            errors.description = 'Description must be less than 500 characters';
        }

        if (typeof formData.isPublic !== 'boolean') {
            errors.isPublic = 'Is Public must be true or false';
        }

        if (formData.password && formData.password.length > 50) {
            errors.password = 'Password must be less than 50 characters';
        }

        if (!formData.isPublic && !formData.password) {
            errors.password = 'Password is required for private lobbies';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/lobby', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error('Failed to create lobby');
                }

                setShowModal(false);
                setFormData({
                    name: '', description: '', isPublic: true, password: '',
                });
                setFormErrors({});
                setErrors(null);
                fetchYourLobbies();
            } catch (error) {
                setErrors('Failed to create lobby');
            }
        }
    };

    return (
        <div className="your-lobbies-page">
            <div className="background-image"></div>
            <Navbar />
            <div className="lobbies-container">
                <div className="lobbies-header">
                    <h2>Your Lobbies</h2>
                    <button className="add-lobby-button" onClick={() => setShowModal(true)}>
                        Add Lobby
                    </button>
                </div>
                <div className="join-lobby-with-password">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={joinPassword}
                        onChange={(e) => setJoinPassword(e.target.value)}
                    />
                    {joinPassword && (
                        <button onClick={handleJoinLobbyWithPassword}>Join Lobby</button>
                    )}
                </div>

                {errors && <p className="error">{errors}</p>}
                {lobbies.length > 0 ? (
                    <ul className="lobby-list">
                        {lobbies.map((lobby) => (
                            <li key={lobby.id} className="lobby-item">
                                <h3>{lobby.name}</h3>
                                {lobby.description && <p>{lobby.description}</p>}
                                <button className="join-button" onClick={() => handleJoinLobby(lobby.id)}>Join Lobby</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No lobbies available.</p>
                )}
            </div>

            {/* Modal do dodawania nowego lobby */}
            {showModal && (
                <div className="modal-overlay">
                    <div
                        className="modal-content"
                        style={{ backgroundImage: `url(${addLobbyPopUpImage})` }}
                    >
                        <form onSubmit={handleFormSubmit}>
                            <h2>Create New Lobby</h2>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                {formErrors.name && <p className="error">{formErrors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <div className="description-container">
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                {formErrors.description && <p className="error">{formErrors.description}</p>}
                            </div>

                            <div className="form-group">
                                <label>Is Public:</label>
                                <select
                                    value={formData.isPublic ? 'true' : 'false'}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            isPublic: e.target.value === 'true',
                                            password: '', // Reset password przy zmianie na publiczne
                                        })
                                    }
                                >
                                    <option value="true">Public</option>
                                    <option value="false">Private</option>
                                </select>

                                {formErrors.isPublic && <p className="error">{formErrors.isPublic}</p>}
                            </div>
                            {!formData.isPublic && (
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    {formErrors.password && <p className="error">{formErrors.password}</p>}
                                </div>
                            )}
                            <div className="form-buttons">
                                <button type="submit">Create Lobby</button>
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default YourLobbiesPage;
