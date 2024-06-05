import React from 'react';
import '../../styles/main/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="logo">RPGTime</div>
            <div className="navbar">
                <a href="#user-details">User Details</a>
                <a href="#your-lobbies">Your Lobbies</a>
                <a href="#public-lobbies">Public Lobbies</a>
                <a href="#create-lobby">Create Lobby</a>
                <a href="#forum">Forum</a>
            </div>
        </div>
    );
};

export default Navbar;
