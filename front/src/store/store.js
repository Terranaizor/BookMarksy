import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from "redux-thunk";
import CatalogueReducer from './reducers/catalogue.reducer';
import LinksReducer from './reducers/links.reducer';
import SlidersReducer from './reducers/sliders.reducer';

const reducers = {
    catalogueReducer: CatalogueReducer,
    linksReducer: LinksReducer,
    slidersReducer: SlidersReducer
}

const rootReducers = combineReducers(reducers);

const composedEnhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

const store = createStore(rootReducers, composedEnhancer);

export default store;

