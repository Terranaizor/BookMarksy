import { SET_LINKS_TYPE } from "../actions/links.action";

const initialState = {
    newBooksUrl: null,
    popularBooksUrl: null,
    catalogueBooksUrl: null,
    genresListUrl: null,
    publishersListUrl: null
};

const LinksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LINKS_TYPE: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}

export const getNewBooksUrlSelector = (state) => state.linksReducer.newBooksUrl;
export const getPopularBooksUrlSelector = (state) => state.linksReducer.popularBooksUrl;
export const getCatalogueBooksUrlSelector = (state) => state.linksReducer.catalogueBooksUrl;
export const getGenresListUrlSelector = (state) => state.linksReducer.genresListUrl;
export const getPublishersListUrlSelector = (state) => state.linksReducer.publishersListUrl;

export default LinksReducer;