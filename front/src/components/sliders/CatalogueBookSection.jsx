import React from 'react';
import { Book } from '../';
import { getCurrentDataSelector } from '../../store/reducers/catalogue.reducer';
import { useSelector } from 'react-redux';

const CatalogueBookSection = () => {
    const currentData = useSelector(getCurrentDataSelector);

    return (
        <section className='catalogue-book__section' >
            {currentData && currentData.map((book) => (
                <Book title={book.title}
                    author={book.author}
                    rating={book.rating}
                    cover={book.cover}
                    publisher={book.publisher}
                    key={book.url}
                />
            ))}
            {currentData && currentData.map((book, index) => (
                index % 2 === 0 ? <Book title={book.title}
                    author={book.author}
                    rating={book.rating}
                    cover={book.cover}
                    publisher={book.publisher}
                    key={book.url}
                /> : null
            ))}
        </section>
    );
};

export default CatalogueBookSection;