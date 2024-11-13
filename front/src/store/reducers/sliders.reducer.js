import { DOWNLOAD_SLIDERS_DATA_TYPE, SET_SLIDERS_DATA_LOADING_TYPE } from "../actions/sliders.action";

const initialState = {
    popularBooks: {
        title: "Popular",
        data: []
    },
    newBooks: {
        title: "New",
        data: []
    },
    loading: false
};

const SlidersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SLIDERS_DATA_LOADING_TYPE:
            return {
                ...state,
                loading: action.payload,
            };

        case DOWNLOAD_SLIDERS_DATA_TYPE:
            return {
                ...state,
                [action.payload.name]: {
                    ...state,
                    title: action.payload.title,
                    data: action.payload.data,
                }
            };

        default:
            return state;
    }
}

export const getPopularBooksSelector = (state) => state.slidersReducer.popularBooks;
export const getNewBooksSelector = (state) => state.slidersReducer.newBooks;
export const getLoaderSlidersSelector = (state) => state.slidersReducer.loading;

export default SlidersReducer;