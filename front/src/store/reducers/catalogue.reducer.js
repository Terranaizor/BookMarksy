import { DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE, DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE } from "../actions/catalogue.reducer";

const initialState = {
    currentPage: 1,
    previousPage: null,
    currentData: [],
    previousData: []
};

const CatalogueReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE: {
            return initialState;
        }
        case DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE: {
            return initialState;
        }
        default:
            return initialState;
    }
}

export const getCurrentPageSelector = (state) => state.catalogueReducer.currentPage;
export const getPreviousPageSelector = (state) => state.catalogueReducer.previousPage;
export const getCurrentDataSelector = (state) => state.catalogueReducer.currentData;
export const getPreviousDataSelector = (state) => state.catalogueReducer.previousData;

export default CatalogueReducer;