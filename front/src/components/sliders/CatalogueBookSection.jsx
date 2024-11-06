import React from 'react';
import { Book } from '../';
import { getCurrentDataSelector } from '../../store/reducers/catalogue.reducer';
import { useSelector } from 'react-redux';

const CatalogueBookSection = () => {
    const currentData = useSelector(getCurrentDataSelector);

    return (
        <div className='catalogue-book-section'
            style={{
                'display': 'grid', 'gap': '20px', 'gridTemplateColumns': 'repeat(3, 1fr)',
                'marginBottom': '20px'
            }}>
            {currentData && currentData.map((book) => (
                <Book title={book.title}
                    author={book.author}
                    rating={book.rating}
                    cover={book.cover}
                    publisher={book.publisher}
                    key={book.url}
                />
            ))}
        </div>
    );
};

export default CatalogueBookSection;