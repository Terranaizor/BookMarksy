import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
    const totalStars = 5;

    return (
        <div className='book-rating'>
            {Array.from({ length: totalStars }, (_, index) => {
                if (index + 1 <= Math.floor(rating)) {
                    return <FontAwesomeIcon className='icon' key={index} icon={faSolidStar} />;
                } else if (index + 1 === Math.ceil(rating) && rating % 1 >= 0.5) {
                    return <FontAwesomeIcon className='icon' key={index} icon={faStarHalfStroke} />;
                } else {
                    return <FontAwesomeIcon className='icon' key={index} icon={faRegularStar} />;
                }
            })}
        </div>
    );
};

export default StarRating;



