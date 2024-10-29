import React from 'react';
import { getCatalogueThunk } from '../store/actions/catalogue.action';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentDataSelector, getIsLoadindSelector } from '../store/reducers/catalogue.reducer';

const Catalogue = () => {

    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoadindSelector);
    const currentData = useSelector(getCurrentDataSelector);

    const getBooks = () => {
        dispatch(getCatalogueThunk());
    };

    return (
        <div>
        
            <button onClick={getBooks} disabled={isLoading}>
                {isLoading ? "Loading..." : "Get Books from API"}
            </button>
 
            {currentData && currentData.map((book) => (
                <div key={book.url}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Rating: {book.rating}</p>
                    <img src={book.cover} alt={`Cover of ${book.title}`} style={{ width: '100px', height: '150px' }} />
                    <p>Publisher: {book.publisher}</p>
                </div>
            ))}

        </div>
    );
};

export default Catalogue;