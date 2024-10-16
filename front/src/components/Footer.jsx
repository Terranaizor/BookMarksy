import React from 'react';
import BookMarksy from "../assets/images/BookMarksy.jpg"

const Footer = ({ SetShowLogin, toggleLoginPopup, currentLoginState, SetCurrentLoginState }) => {
    return (
        <footer>
            <div className="footer-logo">
                <div>
                    <img src={BookMarksy} alt="BookMarksy" className="logo-image" />
                    <h3 className="logo-title">BookMarksy</h3>
                </div>
                <p className="logo-subtitle">Dive into a World of Stories Together</p>
            </div>

            <ul className="footer-nav">
                <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Contact us</a></li>
                <li className="nav-item"><a href="#" className="nav-link">About developers</a></li>
            </ul>

            <div class="auth-buttons">
                <button className="register" onClick={() => {
                    SetCurrentLoginState("Sign up");
                    SetShowLogin(true); toggleLoginPopup();
                }}>Sign up</button>
                <button className="login" onClick={() => {
                    SetCurrentLoginState("Log in");
                    SetShowLogin(true); toggleLoginPopup();
                }}>Log in</button>
            </div>
        </footer>
    );
};

export default Footer;