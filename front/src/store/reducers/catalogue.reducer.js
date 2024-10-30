import { DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE, DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE, SET_CATALOGUE_DATA_LOADING_TYPE, SWAP_DATA_TYPE } from "../actions/catalogue.action";

const initialState = {
    catalogueSliderData: {
        currentPage: 1,
        previousPage: null,
        currentData: [],
        previousData: [],
    },
    numberOfBooks: 0,
    numberOfBooksPerPage: 5,
    isLoading: false,
};

const CatalogueReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE: {
            return {
                ...state,
                catalogueSliderData: {
                    ...state.catalogueSliderData,
                    currentData: action.payload.currentData,
                    currentPage: action.payload.currentPage
                },
                numberOfBooks: action.payload.numberOfBooks
            };
        }
        case DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE: {
            return {
                ...state,
                catalogueSliderData: {
                    ...state.catalogueSliderData,
                    previousPage: action.payload.previousPage,
                    previousData: action.payload.previousData
                }
            };
        }

        case SET_CATALOGUE_DATA_LOADING_TYPE: {
            return { ...state, isLoading: action.payload };
        }

        case SWAP_DATA_TYPE: {
            return {
                ...state,
                catalogueSliderData: {
                    previousPage: action.payload.currentPage,
                    previousData: action.payload.currentData,
                    currentData: action.payload.previousData,
                    currentPage: action.payload.previousPage
                }
            };
        }

        default:
            return state;
    }
}

export const getCurrentPageSelector = (state) => state.catalogueReducer.catalogueSliderData.currentPage;
export const getPreviousPageSelector = (state) => state.catalogueReducer.catalogueSliderData.previousPage;
export const getCurrentDataSelector = (state) => state.catalogueReducer.catalogueSliderData.currentData;
export const getPreviousDataSelector = (state) => state.catalogueReducer.catalogueSliderData.previousData;

export const getIsLoadindSelector = (state) => state.catalogueReducer.isLoading;

export const getNumberOfBooksSelector = (state) => state.catalogueReducer.numberOfBooks;
export const getNumberOfBooksPerPageSelector = (state) => state.catalogueReducer.numberOfBooksPerPage;

export default CatalogueReducer;