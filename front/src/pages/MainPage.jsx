import React from 'react';
import BlurNotifications from '../components/BlurNotifications';
import Community from '../components/Community';
import Catalogue from '../components/Catalogue';

const MainPage = () => {
    return (
        <div>
            <BlurNotifications />
            <Catalogue />
            <Community />
        </div>
    );
};

export default MainPage;