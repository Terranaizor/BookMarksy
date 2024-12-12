import { DOWNLOAD_FILTERS_DATA_TYPE, DOWNLOAD_NEW_CATALOGUE_PAGE_DATA_TYPE, DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_DATA_TYPE, SET_CATALOGUE_DATA_LOADING_TYPE, SET_FILTERS_LOADING_TYPE, SHOW_FILTERED_BOOKS_TYPE, SWAP_DATA_TYPE } from "../actions/catalogue.action";

const initialState = {
    catalogueSliderData: {
        currentPage: 1,
        previousPage: null,
        currentData: [],
        previousData: [],
    },
    numberOfBooks: 0,
    numberOfBooksPerPage: 15,
    isDataLoading: true,
    isFiltersLoading: false,
    filters: {},
    showFiltered: false
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
                numberOfBooksPerPage:action.payload.book_count_page, 
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
        case DOWNLOAD_FILTERS_DATA_TYPE: {
            return {
                ...state,
                filters: action.payload.filters
            };
        }

        case SET_CATALOGUE_DATA_LOADING_TYPE: {
            return { ...state, isDataLoading: action.payload };
        }

        case SET_FILTERS_LOADING_TYPE: {
            return { ...state, isFiltersLoading: action.payload };
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
        case SHOW_FILTERED_BOOKS_TYPE: {
            return { ...state, showFiltered: action.payload };
        }
        default:
            return state;
    }
}

export const getCurrentPageSelector = (state) => state.catalogueReducer.catalogueSliderData.currentPage;
export const getPreviousPageSelector = (state) => state.catalogueReducer.catalogueSliderData.previousPage;
export const getCurrentDataSelector = (state) => state.catalogueReducer.catalogueSliderData.currentData;
export const getPreviousDataSelector = (state) => state.catalogueReducer.catalogueSliderData.previousData;

export const getIsDataLoadingSelector = (state) => state.catalogueReducer.isDataLoading;
export const getIsFiltersLoadingSelector = (state) => state.catalogueReducer.isFiltersLoading;

export const getNumberOfBooksSelector = (state) => state.catalogueReducer.numberOfBooks;
export const getNumberOfBooksPerPageSelector = (state) => state.catalogueReducer.numberOfBooksPerPage;

export const getFiltersSelector = (state) => state.catalogueReducer.filters;
export const getIsFilteredSelector = (state) => state.catalogueReducer.showFiltered;

export default CatalogueReducer;