import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import StarRating from './StarRating';

const Book = ({ title, author, rating, cover }) => {
    return (
        <div className='single-book-section'>
            <h4 className='single-book-title'>{title}</h4>
            <p className='single-book-text'>{author}</p>
            <img className='single-book-img' src={cover} alt={`Cover of ${title}`} />
            <StarRating rating={rating} />
            <div className='actions-bar'>
                <FontAwesomeIcon icon={faBookmark} className='icon' />
                <FontAwesomeIcon icon={faComment} className='icon' />
                <FontAwesomeIcon icon={faShareFromSquare} className='icon' />
            </div>
        </div>
    );
};

export default Book;