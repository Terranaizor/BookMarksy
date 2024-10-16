import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'

const LoginPopup = ({ SetShowLogin, toggleLoginPopup, currentLoginState, SetCurrentLoginState }) => {

    const popupRef = useRef(null);

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [loginData, SetLoginData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType(confirmPasswordType === "password" ? "text" : "password");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError("");
        setConfirmPasswordError("");

        const trimmedEmail = loginData.email.trim();
        const trimmedUsername = loginData.username.trim();

        if (currentLoginState === "Log in") {
            const loginPayload = {
                email: trimmedEmail,
                password: loginData.password
            };
            console.log("Login Data:", loginPayload);
            SetShowLogin(false);

        }

        if (currentLoginState === "Sign up") {
            let isValid = true;
            if (loginData.password.length < 8) {
                setPasswordError("Password must be at least 8 characters long.");
                isValid = false;
            }
            if (loginData.password !== loginData.confirmPassword) {
                setConfirmPasswordError("Passwords do not match.");
                isValid = false;
            }

            if (isValid) {
                const signupPayload = {
                    email: trimmedEmail,
                    username: trimmedUsername,
                    password: loginData.password,
                    confirmPassword: loginData.confirmPassword
                };
                console.log("Signup Data:", signupPayload);
                SetShowLogin(false);
                toggleLoginPopup();
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        SetLoginData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                SetShowLogin(false);
                toggleLoginPopup();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [SetShowLogin]);

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={handleSubmit} ref={popupRef}>
                <div className='login-popup-title'>
                    <p>Welcome!</p>
                    <h3>{currentLoginState}</h3>
                    <p className='login-title--subtext'>Dive into a World of stories together</p>
                </div>
                <div className='login-popup-inputs'>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email"
                            value={loginData.email}
                            onChange={handleChange} required />
                    </div>

                    {currentLoginState === "Sign up"
                        ? <div className="input-group">
                            <label htmlFor="username">User name</label>
                            <input type="text" id="username" placeholder="Enter your user name"
                                value={loginData.username}
                                onChange={handleChange} required />
                        </div>
                        : <></>
                    }
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className='password-group'>
                            <input type={passwordType} onPaste={(e) => { e.preventDefault(); }} id="password" placeholder="Enter your password" value={loginData.password}
                                onChange={handleChange} required />
                            {passwordType === "password"
                                ? <FontAwesomeIcon icon={faEye}
                                    onClick={() => togglePasswordVisibility()} />
                                : <FontAwesomeIcon icon={faEyeSlash}
                                    onClick={() => togglePasswordVisibility()} />
                            }
                        </div>
                        {passwordError && currentLoginState === "Sign up" && <p className='error-message'>{passwordError}</p>}
                    </div>
                    {currentLoginState === "Sign up"
                        ? <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className='password-group'>
                                <input type={confirmPasswordType} id="confirmPassword" placeholder="Confirm your password" value={loginData.confirmPassword}
                                    onChange={handleChange} required onPaste={(e) => { e.preventDefault(); }} />
                                {confirmPasswordType === "password"
                                    ? <FontAwesomeIcon icon={faEye}
                                        onClick={() => toggleConfirmPasswordVisibility()} />
                                    : <FontAwesomeIcon icon={faEyeSlash}
                                        onClick={() => toggleConfirmPasswordVisibility()} />
                                }
                            </div>
                            {confirmPasswordError && <p className='error-message'>{confirmPasswordError}</p>}
                        </div>
                        : <></>
                    }
                    <button type='submit'>Register</button>
                    {currentLoginState === "Sign up"
                        ? <p className='signup-login-link'>Already have an Account?
                            <span onClick={() => SetCurrentLoginState("Log in")}>Login here</span></p>
                        : <p className='signup-login-link'>Create a new Account?
                            <span onClick={() => SetCurrentLoginState("Sign up")}>Sign up here</span></p>
                    }
                </div>
            </form>
        </div>
    );
};

export default LoginPopup;