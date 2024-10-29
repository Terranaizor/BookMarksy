import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from "redux-thunk";
import CatalogueReducer from './reducers/catalogue.reducer';
import LinksReducer from './reducers/links.reducer';

const reducers = {
    catalogueReducer: CatalogueReducer,  
    linksReducer: LinksReducer
}

const rootReducers = combineReducers(reducers);
const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;

