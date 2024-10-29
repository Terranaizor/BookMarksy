import { DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE, DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE, SET_CATALOGUE_DATA_LOADING } from "../actions/catalogue.action";

const initialState = {
    currentPage: 1,
    previousPage: null,
    currentData: [],
    previousData: [],
    isLoading: false
};

const CatalogueReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE: {
            return {
                ...state,
                ...action.payload
            };
        }
        case DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE: {
            return state;
        }

        case SET_CATALOGUE_DATA_LOADING: {
            return { ...state, isLoading: action.payload };
        }

        default:
            return state;
    }
}

export const getCurrentPageSelector = (state) => state.catalogueReducer.currentPage;
export const getPreviousPageSelector = (state) => state.catalogueReducer.previousPage;
export const getCurrentDataSelector = (state) => state.catalogueReducer.currentData;
export const getPreviousDataSelector = (state) => state.catalogueReducer.previousData;
export const getIsLoadindSelector = (state) => state.catalogueReducer.isLoading;

export default CatalogueReducer;