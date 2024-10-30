import axios from "axios";
export const DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE";
export const DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE = "DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE";
export const SET_CATALOGUE_DATA_LOADING_TYPE = "SET_CATALOGUE_DATA_LOADING_TYPE";

export const setDownloadNewPageDataAction = (currentData, numberOfBooks) => {
    return {
        type: DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE,
        payload: {
            currentData,
            numberOfBooks
        }
    };
};

export const setDownloadPrevPageDataAction = () => {
    return {
        type: DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE,
    };
};

export const setCatalogueDataLoadingAction = (loading) => {
    return {
        type: SET_CATALOGUE_DATA_LOADING_TYPE,
        payload: loading,
    };
};

export const getCatalogueThunk = (catalogueBooksUrl) => {
    return async (dispatch, getState) => {
        dispatch(setCatalogueDataLoadingAction(true));
        console.log("getCatalogueThunk called")
        try {
            const response = await axios.get(catalogueBooksUrl);
            const currentData = response.data.results;
            const numberOfBooks = response.data.count;

            dispatch(setDownloadNewPageDataAction(currentData, numberOfBooks));
        } catch (error) {
            console.error("Error fetching catalogue:", error);
        } finally {
            dispatch(setCatalogueDataLoadingAction(false));
        }
    }
}
