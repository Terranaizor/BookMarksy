import React from 'react';

const Book = ({url, title, author, rating, cover, publisher}) => {
    return (
        <div key={url}>
              <div style={{ 'display': 'flex', 'flexDirection': 'column', 'border':'3px solid red' }} key={url}>
                    <h3>{title}</h3>
                    <p>Author: {author}</p>
                    <p>Rating: {rating}</p>
                    <img src={cover} alt={`Cover of ${title}`} style={{ width: '100px', height: '150px' }} />
                    <p>Publisher: {publisher}</p>
                </div>
        </div>
    );
};

export default Book;