import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDataSelector, getCurrentPageSelector, getIsFilteredSelector, getNumberOfBooksPerPageSelector, getNumberOfBooksSelector, getPreviousDataSelector, getPreviousPageSelector } from '../../store/reducers/catalogue.reducer';
import { getCatalogueBooksUrlSelector } from '../../store/reducers/links.reducer';
import { getCatalogueThunk, setDownloadPrevPageDataAction, swapDataAction } from '../../store/actions/catalogue.action';
import { Pagination } from 'rsuite'
import { useCatalogueData } from '../../context/CatalogueDataContext';

const PaginationComponent = () => {
    const catalogueBooksUrl = useSelector(getCatalogueBooksUrlSelector);
    const dispatch = useDispatch();

    const numberOfBooks = useSelector(getNumberOfBooksSelector);
    const numberOfBooksPerPage = useSelector(getNumberOfBooksPerPageSelector);

    const currentPage = useSelector(getCurrentPageSelector);
    const currentData = useSelector(getCurrentDataSelector);
    const previousPage = useSelector(getPreviousPageSelector);
    const previousData = useSelector(getPreviousDataSelector);

    const [activePage, setActivePage] = useState(1);
    const paginationData = {
        prev: true,
        next: true,
        first: true,
        last: true,
        maxButtons: 4,
        layout: ['pager']
    };

    const { apiUrlForSortCatalogue } = useCatalogueData();
    const isFiltered = useSelector(getIsFilteredSelector);

    const handlePageClick = (pageNumber) => {
        const isNewPage = currentPage !== pageNumber;
        const isPreviousPage = pageNumber === previousPage;
        const newCatalogueBooksUrl = `${catalogueBooksUrl}?page=${pageNumber}`;

        let apiUrl = '';
        isFiltered ? apiUrl = `${apiUrlForSortCatalogue}?page=${pageNumber}`
            : apiUrl = newCatalogueBooksUrl

        if (isNewPage) {
            if (isPreviousPage) {
                dispatch(swapDataAction(currentPage, currentData, previousPage, previousData));
                return;
            }
            if (catalogueBooksUrl && currentData) {
                dispatch(setDownloadPrevPageDataAction(currentPage, currentData));
                dispatch(getCatalogueThunk(apiUrl, pageNumber));
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        handlePageClick(pageNumber);
    };

    return (
        <div className='pagination-section'>
            <Pagination
                layout={paginationData.layout}
                prev={paginationData.prev}
                next={paginationData.next}
                first={paginationData.first}
                last={paginationData.last}

                total={numberOfBooks}
                limit={numberOfBooksPerPage}

                activePage={activePage}
                maxButtons= {paginationData.maxButtons}
                onChangePage={handlePageChange}
            />
        </div>
    );
};

export default PaginationComponent;