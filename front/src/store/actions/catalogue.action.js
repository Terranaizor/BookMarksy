import axios from "axios";
export const DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE";
export const DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE";
export const SET_CATALOGUE_DATA_LOADING_TYPE = "SET_CATALOGUE_DATA_LOADING_TYPE";
export const SWAP_DATA_TYPE = "SWAP_DATA_TYPE";

export const setDownloadNewPageDataAction = (currentData, numberOfBooks, currentPage) => {
    return {
        type: DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE,
        payload: {
            currentData,
            numberOfBooks,
            currentPage
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

export const getCatalogueThunk = (catalogueBooksUrl, currentPage) => {
    return async (dispatch) => {
        dispatch(setCatalogueDataLoadingAction(true));
        try {
            const response = await axios.get(catalogueBooksUrl);
            const currentData = response.data.results;
            const numberOfBooks = response.data.count;
            dispatch(setDownloadNewPageDataAction(currentData, numberOfBooks, currentPage));
        } catch (error) {
            console.error("Error fetching catalogue:", error);
        } finally {
            dispatch(setCatalogueDataLoadingAction(false));
        }
    }
}
