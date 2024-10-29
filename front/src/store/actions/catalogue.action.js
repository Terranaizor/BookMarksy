import axios from "axios";
import { getCatalogueBooksUrlSelector, getPopularBooksUrlSelector } from "../reducers/links.reducer";
import { useSelector } from "react-redux";
export const DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE = "DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE";
export const DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE = "DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE";
export const SET_CATALOGUE_DATA_LOADING = "SET_CATALOGUE_DATA_LOADING";

export const setDownloadNewPageAction = (newPageData) => {
    return {
        type: DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE,
        payload: newPageData
    };
};

export const setDownloadPrevPageAction = () => {
    return {
        type: DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE,
    };
};

export const setCatalogueDataLoadingAction = (loading) => {
    return {
        type: SET_CATALOGUE_DATA_LOADING,
        payload: loading,
    };
};

export const getCatalogueThunk = () => {
    return async (dispatch, getState) => {
        console.time("API Fetch Time");
        dispatch(setCatalogueDataLoadingAction(true));

        const catalogueBooksUrl = getCatalogueBooksUrlSelector(getState());

        try { 
            const response = await axios.get(catalogueBooksUrl);
            console.log("response(getState())", response)
            const newData = {
                currentData: response.data.results, 
            };

            dispatch(setDownloadNewPageAction(newData));
        } catch (error) {
            console.error("Error fetching catalogue:", error);
        } finally {
            dispatch(setCatalogueDataLoadingAction(false));
            console.timeEnd("API Fetch Time");
        }
    }
}
