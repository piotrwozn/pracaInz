import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../utils/i18n';
import HomePage from './main/HomePage';
import MainPage from './main/MainPage';
import LoginPage from './main/LoginPage';
import SignUpPage from './main/SignUpPage';
import WelcomePage from './user/WelcomePage';
import UserDetailsPage from './user/UserDetailsPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/mainPage" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/welcome" element={<WelcomePage/>}/>
                <Route path="/user-details" element={<UserDetailsPage />} />
            </Routes>
        </Router>
    );
}

export default App;