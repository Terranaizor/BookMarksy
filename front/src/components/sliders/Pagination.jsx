import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNumberOfBooksPerPageSelector, getNumberOfBooksSelector } from '../../store/reducers/catalogue.reducer';
import { getCatalogueBooksUrlSelector } from '../../store/reducers/links.reducer';
import { getCatalogueThunk } from '../../store/actions/catalogue.action';

const Pagination = () => {

    const catalogueBooksUrl = useSelector(getCatalogueBooksUrlSelector);

    const numberOfBooks = useSelector(getNumberOfBooksSelector);
    const numberOfBooksPerPage = useSelector(getNumberOfBooksPerPageSelector);
    const numberOfPages = Math.ceil(numberOfBooks / numberOfBooksPerPage);

    const handlePageClick = (pageNumber) => {
        console.log("Page clicked:", pageNumber);
        const newCatalogueBooksUrl = `${catalogueBooksUrl}?page=${pageNumber}`
 
        if (catalogueBooksUrl) { dispatch(getCatalogueThunk(newCatalogueBooksUrl)); }
    };

    const dispatch = useDispatch();

 

 

    return (
        <div>
            {Array.from({ length: numberOfPages }, (_, index) => (
                <button style={{ 'width': '100px', 'marginLeft': '20px' }} key={index + 1} onClick={() => handlePageClick(index + 1)}>
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;