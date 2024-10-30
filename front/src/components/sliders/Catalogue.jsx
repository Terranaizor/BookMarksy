import React from 'react';
import { useSelector } from "react-redux";
import { getCurrentDataSelector } from '../../store/reducers/catalogue.reducer';
import Pagination from './Pagination';
import Book from './Book';

const Catalogue = () => {
    const currentData = useSelector(getCurrentDataSelector);
    return (
        <section className='catalogue-section'>
            <div className='catalogue-book-section'
                style={{
                    'display': 'grid', 'gap': '20px', 'gridTemplateColumns': 'repeat(3, 1fr)',
                    'marginBottom': '20px'
                }}
            >
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
            <Pagination />
        </section>
    );
};

export default Catalogue;