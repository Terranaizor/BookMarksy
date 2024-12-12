import axios from "axios";
export const DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE";
export const DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE";
export const DOWNLOAD_FILTERS_DATA_TYPE = "DOWNLOAD_FILTERS_DATA_TYPE";
export const SET_CATALOGUE_DATA_LOADING_TYPE = "SET_CATALOGUE_DATA_LOADING_TYPE";
export const SWAP_DATA_TYPE = "SWAP_DATA_TYPE";
export const SET_FILTERS_LOADING_TYPE = "SET_FILTERS_LOADING_TYPE";
export const SHOW_FILTERED_BOOKS_TYPE = "SHOW_FILTERED_BOOKS_TYPE";

export const downloadNewPageDataAction = (currentData, numberOfBooks, book_count_page, currentPage) => {
    return {
        type: DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE,
        payload: {
            currentData,
            numberOfBooks,
            book_count_page,
            currentPage
        }
    };
};

export const downloadFiltersAction = (filters) => {
    return {
        type: DOWNLOAD_FILTERS_DATA_TYPE,
        payload: {
            filters
        }
    };
};

export const setDownloadPrevPageDataAction = (previousPage, previousData) => {
    return {
        type: DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE,
        payload: {
            previousPage,
            previousData
        }
    };
};

export const setCatalogueDataLoadingAction = (loading) => {
    return {
        type: SET_CATALOGUE_DATA_LOADING_TYPE,
        payload: loading,
    };
};

export const setFiltersLoadingAction = (loading) => {
    return {
        type: SET_FILTERS_LOADING_TYPE,
        payload: loading,
    };
};

export const swapDataAction = (currentPage, currentData, previousPage, previousData) => {
    return {
        type: SWAP_DATA_TYPE,
        payload: {
            currentPage,
            currentData,
            previousPage,
            previousData
        }
    };
};

export const showFilteredAction = (showFiltered) => {
    return {
        type: SHOW_FILTERED_BOOKS_TYPE,
        payload: showFiltered,
    };
};

export const getCatalogueThunk = (catalogueBooksUrl, currentPage) => {
    return async (dispatch) => {
        dispatch(setCatalogueDataLoadingAction(true));
        try {
            const response = await axios.get(catalogueBooksUrl);
            const currentData = response.data.results;
            const numberOfBooks = response.data.count;
            const book_count_page = response.data.book_count_page;
            dispatch(downloadNewPageDataAction(currentData, numberOfBooks, book_count_page, currentPage));
        } catch (error) {
            console.error("Error fetching catalogue:", error);
        } finally {
            dispatch(setCatalogueDataLoadingAction(false));
        }
    }
}

export const getFiltersThunk = (filterParametersUrl) => {
    return async (dispatch) => {
        dispatch(setFiltersLoadingAction(true));
        try {
            const response = await axios.get(filterParametersUrl);
            const filtersData = response.data;
            dispatch(downloadFiltersAction(filtersData));
        } catch (error) {
            console.error("Error fetching filters:", error);
        } finally {
            dispatch(setFiltersLoadingAction(false));
        }
    }
}