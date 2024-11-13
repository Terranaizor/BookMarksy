import axios from "axios";
import { areGenresLoadedSelector } from "../reducers/catalogue.reducer";
export const DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE";
export const DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE";
export const DOWNLOAD_GENRES_DATA_TYPE = "DOWNLOAD_GENRES_DATA_TYPE";
export const SET_CATALOGUE_DATA_LOADING_TYPE = "SET_CATALOGUE_DATA_LOADING_TYPE";
export const SWAP_DATA_TYPE = "SWAP_DATA_TYPE";
export const SET_GENRES_LOADING_TYPE = "SET_GENRES_LOADING_TYPE";

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

export const downloadGenresAction = (genresArray) => {
    return {
        type: DOWNLOAD_GENRES_DATA_TYPE,
        payload: {
            genresArray
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

export const setGenresLoadingAction = (loading) => {
    return {
        type: SET_GENRES_LOADING_TYPE,
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
            const book_count_page = response.data.book_count_page;
            dispatch(downloadNewPageDataAction(currentData, numberOfBooks, book_count_page, currentPage));
        } catch (error) {
            console.error("Error fetching catalogue:", error);
        } finally {
            dispatch(setCatalogueDataLoadingAction(false));
        }
    }
}

export const getGenresThunk = (genresListUrl) => {
    return async (dispatch, getState) => {
        dispatch(setGenresLoadingAction(true));
        try {
            const state = getState();
            const areGenresLoaded = areGenresLoadedSelector(state);
            if (!areGenresLoaded) {
                const response = await axios.get(genresListUrl);
                const genresArray = response.data;
                dispatch(downloadGenresAction(genresArray));
            }
        } catch (error) {
            console.error("Error fetching genres:", error);
        } finally {
            dispatch(setGenresLoadingAction(false));
        }
    }
}