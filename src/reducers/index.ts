import { combineReducers } from 'redux';
import mapPointsReducer from './mapPoints';
import tabsReducer from './tabs';
import filtersReducer from './filters';

const reducers = combineReducers({
    mapPoints: mapPointsReducer,
    tab: tabsReducer,
    filters: filtersReducer,
});

export default reducers;
