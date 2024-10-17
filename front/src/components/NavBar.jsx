import React, { Fragment } from 'react';
import BookMarksy from "../assets/images/BookMarksy.jpg";
import BookMarksyPink from "../assets/images/BookMarksyPink.jpg";
import BookMarksyDark from "../assets/images/BookMarksyDark.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ThemeSelect from "./ThemeSelect";
import { useTheme } from '../context/ThemeContext';

const NavBar = ({ SetShowLogin, toggleLoginPopup }) => {
    const { theme } = useTheme();
    return (
        <Fragment>
            <nav className='main-nav'>
                <div>
                    {theme === "pink" ? (
                        <img src={BookMarksyPink} alt="BookMarksy" />
                    ) : theme === "dark" ? (
                        <img src={BookMarksyDark} alt="BookMarksy" />
                    ) : (
                        <img src={BookMarksy} alt="BookMarksy" />
                    )}
                    <h1>BookMarksy</h1>
                </div>
                <div className='navbar-settings'>
                    <ThemeSelect />
                    <FontAwesomeIcon icon={faUser} className='icon' onClick={() => { SetShowLogin(true); toggleLoginPopup(); }} />
                </div>

            </nav>
            <hr className='separator' />
        </Fragment>
    );
};

export default NavBar;