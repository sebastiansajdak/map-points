import typeToReducer from 'type-to-reducer';
import { IStore } from 'types/store';
import {
    FULFILLED,
    PENDING,
    REJECTED,
} from 'constants/common';
import {
    GET_VEHICLES,
    GET_PARKINGS,
    GET_POI,
} from 'constants/actionTypes';

type IState = IStore['mapPoints'];

export const initialState: IState = {
    vehicle: {
        items: [],
        isFetching: false,
    },
    parking: {
        items: [],
        isFetching: false,
    },
    poi: {
        items: [],
        isFetching: false,
    },
    isError: false,
};

export default typeToReducer({
    [GET_VEHICLES]: {
        [PENDING]: (state): IState => ({
            ...state,
            vehicle: {
                ...state.vehicle,
                isFetching: true,
            },
            isError: false,
        }),
        [FULFILLED]: (state, action): IState => ({
            ...state,
            vehicle: {
                isFetching: false,
                items: action.payload,
            },
            isError: false,
        }),
        [REJECTED]: (state): IState => ({
            ...state,
            vehicle: {
                ...state.vehicle,
                isFetching: false,
            },
            isError: true,
        }),
    },
    [GET_PARKINGS]: {
        [PENDING]: (state): IState => ({
            ...state,
            parking: {
                ...state.parking,
                isFetching: true,
            },
            isError: false,
        }),
        [FULFILLED]: (state, action): IState => ({
            ...state,
            parking: {
                isFetching: false,
                items: action.payload,
            },
            isError: false,
        }),
        [REJECTED]: (state): IState => ({
            ...state,
            parking: {
                ...state.parking,
                isFetching: false,
            },
            isError: true,
        }),
    },
    [GET_POI]: {
        [PENDING]: (state): IState => ({
            ...state,
            poi: {
                ...state.poi,
                isFetching: true,
            },
            isError: false,
        }),
        [FULFILLED]: (state, action): IState => ({
            ...state,
            poi: {
                isFetching: false,
                items: action.payload,
            },
            isError: false,
        }),
        [REJECTED]: (state): IState => ({
            ...state,
            poi: {
                ...state.poi,
                isFetching: false,
            },
            isError: true,
        }),
    },
}, initialState);
