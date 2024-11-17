import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main/Navbar.css';
import logo from '../../assets/images/logo.png'; // Adjust the path to your logo

const Navbar = () => {
    return (
        <div className="navbar-container">
            <img src={logo} alt="Logo" className="logo" />
            <div className="navbar">
                <Link to="/user-details">User Details</Link>
                <Link to="/your-lobbies">Your Lobbies</Link>
                <Link to="/public-lobbies">Public Lobbies</Link>
                <Link to="/create-lobby">Create Lobby</Link>
                <Link to="/forum">Forum</Link>
            </div>
        </div>
    );
};

export default Navbar;