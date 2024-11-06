import React from 'react';
import {Community, Catalogue, BlurNotifications}  from '../components/';

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