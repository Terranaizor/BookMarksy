import React from 'react';
import { Community, Catalogue, BlurNotifications } from '../components/';
import SliderComponent from '../components/sliders/SliderComponent';
import { useSelector } from 'react-redux';
import { getNewBooksSelector, getPopularBooksSelector } from '../store/reducers/sliders.reducer';

const MainPage = () => {
    const popularBooks = useSelector(getPopularBooksSelector);
    const newBooks = useSelector(getNewBooksSelector);

    return (
        <div>
        {console.log("popularBooks", popularBooks)}
        {console.log("newBooks", newBooks)}
            <BlurNotifications />
            <SliderComponent {...popularBooks} />
            <SliderComponent {...newBooks} />
            <Catalogue />
            <Community />
        </div>
    );
};

export default MainPage;