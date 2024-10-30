import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDataSelector, getCurrentPageSelector, getNumberOfBooksPerPageSelector, getNumberOfBooksSelector, getPreviousDataSelector, getPreviousPageSelector } from '../../store/reducers/catalogue.reducer';
import { getCatalogueBooksUrlSelector } from '../../store/reducers/links.reducer';
import { getCatalogueThunk, setDownloadPrevPageDataAction, swapDataAction } from '../../store/actions/catalogue.action';

const Pagination = () => {
    const catalogueBooksUrl = useSelector(getCatalogueBooksUrlSelector);
    const dispatch = useDispatch();

    const numberOfBooks = useSelector(getNumberOfBooksSelector);
    const numberOfBooksPerPage = useSelector(getNumberOfBooksPerPageSelector);
    const numberOfPages = Math.ceil(numberOfBooks / numberOfBooksPerPage);

    const currentPage = useSelector(getCurrentPageSelector);
    const currentData = useSelector(getCurrentDataSelector);
    const previousPage = useSelector(getPreviousPageSelector);
    const previousData = useSelector(getPreviousDataSelector);

    const handlePageClick = (pageNumber) => {
        const isNewPage = currentPage !== pageNumber;
        const isPreviousPage = pageNumber === previousPage;
        const newCatalogueBooksUrl = `${catalogueBooksUrl}?page=${pageNumber}`;

        if (isNewPage) {
            if (isPreviousPage) {
                dispatch(swapDataAction(currentPage, currentData, previousPage, previousData));
                return;
            }
            if (catalogueBooksUrl && currentData) {
                dispatch(setDownloadPrevPageDataAction(currentPage, currentData));
                dispatch(getCatalogueThunk(newCatalogueBooksUrl, pageNumber));
            }
        }
    };

    return (
        <div className='pagination-section'>
            {Array.from({ length: numberOfPages }, (_, index) => (
                <button
                    className='pagination-btn'
                    style={{ 'width': '100px', 'marginLeft': '20px' }}
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;