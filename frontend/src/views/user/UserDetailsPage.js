import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../../styles/main/UserDetailsPage.css';

function UserDetailsPage() {
    const [currentForm, setCurrentForm] = useState('details');
    const [userDetails, setUserDetails] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/user/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                setErrors({ fetch: 'Failed to fetch user details' });
            }
        };

        fetchUserDetails();
    }, []);

    const handleBack = () => {
        setCurrentForm('details');
        setErrors({});
        setFormData({});
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handler for changing password
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setErrors({});
        const { currentPassword, newPassword, confirmNewPassword } = formData;

        if (newPassword !== confirmNewPassword) {
            setErrors({ passwordMatch: 'New passwords do not match' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/user/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'WrongOldPassword') {
                    setErrors({ wrongOldPassword: 'Current password is incorrect' });
                } else {
                    throw new Error('Failed to change password');
                }
                return;
            }

            alert('Password changed successfully. You will be logged out.');
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:3000';
        } catch (error) {
            setErrors({ passwordChange: 'Failed to change password' });
        }
    };

    // Handler for changing username
    const handleUsernameChange = async (e) => {
        e.preventDefault();
        setErrors({});
        const { newUsername } = formData;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/user/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUsername,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'UsernameTaken') {
                    setErrors({ usernameTaken: 'Username is already taken' });
                } else {
                    throw new Error('Failed to change username');
                }
                return;
            }

            alert('Username changed successfully. You will be logged out.');
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:3000';
        } catch (error) {
            setErrors({ usernameChange: 'Failed to change username' });
        }
    };

    // Handler for changing email
    const handleEmailChange = async (e) => {
        e.preventDefault();
        setErrors({});
        const { newEmail } = formData;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/user/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: newEmail,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'EmailTaken') {
                    setErrors({ emailTaken: 'Email is already taken' });
                } else {
                    throw new Error('Failed to change email');
                }
                return;
            }

            alert('Email changed successfully. You will be logged out.');
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:3000';
        } catch (error) {
            setErrors({ emailChange: 'Failed to change email' });
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setErrors({});
        const { deletePassword } = formData;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/user/me', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: deletePassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'WrongPassword') {
                    setErrors({ wrongPassword: 'Password is incorrect' });
                } else {
                    throw new Error('Failed to delete account');
                }
                return;
            }

            alert('Account deleted successfully. You have been logged out.');
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:3000';
        } catch (error) {
            setErrors({ deleteAccount: 'Failed to delete account' });
        }
    };

    return (
        <div className="user-details-page">
            <div className="background-image"></div>
            <Navbar />
            <div className={`form-container ${currentForm}`}>
                {currentForm === 'details' && userDetails && (
                    <div className="user-details">
                        <h2>User Details</h2>
                        <p><strong>Login:</strong> {userDetails.username}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        <p><strong>Role:</strong> {userDetails.role}</p>
                        <button onClick={() => setCurrentForm('changePassword')}>Change Password</button>
                        <button onClick={() => setCurrentForm('changeUsername')}>Change Username</button>
                        <button onClick={() => setCurrentForm('changeEmail')}>Change Email</button>
                        <button onClick={() => setCurrentForm('deleteAccount')} className="delete-button">Delete Account</button>
                    </div>
                )}

                {currentForm === 'changePassword' && (
                    <div className="form-content">
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordChange}>
                            <label>
                                Current Password:
                                <input
                                    type="password"
                                    name="currentPassword"
                                    required
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                New Password:
                                <input
                                    type="password"
                                    name="newPassword"
                                    required
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Confirm New Password:
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    required
                                    onChange={handleInputChange}
                                />
                            </label>
                            {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
                            {errors.wrongOldPassword && <p className="error">{errors.wrongOldPassword}</p>}
                            {errors.passwordChange && <p className="error">{errors.passwordChange}</p>}
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={handleBack}>Back</button>
                    </div>
                )}

                {currentForm === 'changeUsername' && (
                    <div className="form-content">
                        <h2>Change Username</h2>
                        <form onSubmit={handleUsernameChange}>
                            <label>
                                New Username:
                                <input
                                    type="text"
                                    name="newUsername"
                                    required
                                    onChange={handleInputChange}
                                />
                            </label>
                            {errors.usernameTaken && <p className="error">{errors.usernameTaken}</p>}
                            {errors.usernameChange && <p className="error">{errors.usernameChange}</p>}
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={handleBack}>Back</button>
                    </div>
                )}

                {currentForm === 'changeEmail' && (
                    <div className="form-content">
                        <h2>Change Email</h2>
                        <form onSubmit={handleEmailChange}>
                            <label>
                                New Email:
                                <input
                                    type="email"
                                    name="newEmail"
                                    required
                                    onChange={handleInputChange}
                                />
                            </label>
                            {errors.emailTaken && <p className="error">{errors.emailTaken}</p>}
                            {errors.emailChange && <p className="error">{errors.emailChange}</p>}
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={handleBack}>Back</button>
                    </div>
                )}

                {currentForm === 'deleteAccount' && (
                    <div className="form-content">
                        <h2>Delete Account</h2>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <form onSubmit={handleDeleteAccount}>
                            <label>
                                Current Password:
                                <input
                                    type="password"
                                    name="deletePassword"
                                    required
                                    onChange={handleInputChange}
                                />
                            </label>
                            {errors.wrongPassword && <p className="error">{errors.wrongPassword}</p>}
                            {errors.deleteAccount && <p className="error">{errors.deleteAccount}</p>}
                            <button type="submit" className="delete-submit-button">Delete Account</button>
                        </form>
                        <button onClick={handleBack}>Back</button>
                    </div>
                )}

                {/* Display errors if any */}
                {errors.fetch && <p className="error">{errors.fetch}</p>}
            </div>
        </div>
    );
}

export default UserDetailsPage;