import React, { Fragment } from 'react';
import BookMarksy from "../assets/images/BookMarksy.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'

const NavBar = ({ SetShowLogin, toggleLoginPopup }) => {
    return (
        <Fragment>
            <nav className='main-nav'>
                <div>
                    <img src={BookMarksy} alt="BookMarksy" />
                    <h1>BookMarksy</h1>
                </div>
                <FontAwesomeIcon icon={faUser} className='icon' onClick={() => { SetShowLogin(true); toggleLoginPopup(); }} />
            </nav>
            <hr className='separator' />
        </Fragment>
    );
};

export default NavBar;