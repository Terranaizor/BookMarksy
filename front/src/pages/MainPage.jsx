import React from 'react';
import NavBar from '../components/NavBar';
import BlurNotifications from '../components/BlurNotifications';
import Community from '../components/Community';

const MainPage = () => {
    return (
        <div>
            <NavBar />
            <BlurNotifications />
            <Community />
        </div>
    );
};

export default MainPage;