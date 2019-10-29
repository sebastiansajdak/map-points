import apiRequestCreator from '../middlewares/apiRequestCreator';
import apiResponseParser from '../middlewares/apiResponseParser';
import promise from 'redux-promise-middleware';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { initialState as mapPointsInitialState } from '../reducers/mapPoints';
import { initialState as filtersInitialState } from '../reducers/filters';
import { initialState as tabsInitialState } from '../reducers/tabs';
import { applyMiddleware, compose, createStore } from 'redux';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const initialState = {
    mapPoints: mapPointsInitialState,
    tab: tabsInitialState,
    filters: filtersInitialState
}
const middlewares = [
    apiRequestCreator,
    thunkMiddleware,
    promise,
    apiResponseParser,
];
const composeEnhancers =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const devTools = process.env.NODE_ENV === 'production' ?
        applyMiddleware(...middlewares)
    :
        composeEnhancers(applyMiddleware(...middlewares));


export const initializeStore = (preloadedState = initialState) =>
    createStore(
        reducers,
        preloadedState,
        devTools,
    );
