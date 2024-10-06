import React from 'react';
import NavBar from '../components/NavBar';
import BlurNotifications from '../components/BlurNotifications';
import Community from '../components/Community';
import Footer from '../components/Footer';

const MainPage = () => {
    return (
        <div>
            <NavBar />
            <BlurNotifications />
            <Community />
            <Footer />
        </div>
    );
};

export default MainPage;