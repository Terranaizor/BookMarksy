import React from 'react';

const Book = ({ title, author, rating, cover }) => {
    return (
        <div className='single-book-section'
            style={{ 'display': 'flex', 'flexDirection': 'column', 'border': '3px solid red' }}>
            <h4 className='single-book-title'>{title}</h4>
            <p className='single-book-text'>Author: {author}</p>
            <img className='single-book-img'
                src={cover}
                alt={`Cover of ${title}`}
                style={{ width: '100px', height: '150px' }} />
            <p className='single-book-text'>Rating: {rating}</p>
        </div>
    );
};

export default Book;