import typeToReducer from 'type-to-reducer';
import { IStore } from 'types/store';
import {
    FILTERS_CHANGE_OBJECT_TYPE,
    FILTERS_CHANGE_BATTERY_LEVEL,
    FILTERS_CHANGE_VEHICLE_STATUS,
    FILTERS_CHANGE_VEHICLE_TYPE,
    FILTERS_CHANGE_VEHICLE_COLORS,
    FILTERS_CHANGE_VEHICLE_PLATES,
    FILTERS_CHANGE_VEHICLE_NUMBERS,
    FILTERS_CHANGE_PARKING_AVAILABLE_SPACE,
    FILTERS_CHANGE_NAME,
} from 'constants/actionTypes';

type IState = IStore['filters'];

export const initialState: IState = {
    name: '',
    objectType: {
        vehicle: true,
        parking: false,
        poi: false,
    },
    vehicle: {
        batteryLevel: [0, 100],
        status: {
            available: true,
            unavailable: true,
        },
        type: {
            car: true,
            truck: true,
        },
        colors: [],
        plates: '',
        numbers: '',
    },
    parking: {
        availableSpace: [0, 100],
    },
    poi: {}
};

export default typeToReducer({
    [FILTERS_CHANGE_NAME]: (state, action): IState => ({
        ...state,
        name: action.payload.name,
    }),
    [FILTERS_CHANGE_OBJECT_TYPE]: (state, action): IState => ({
        ...state,
        objectType: {
            ...state.objectType,
            [action.payload.objectType]: action.payload.value,
        },
    }),
    [FILTERS_CHANGE_BATTERY_LEVEL]: (state, action): IState => ({
        ...state,
        vehicle: {
            ...state.vehicle,
            batteryLevel: action.payload.batteryLevel,
        },
    }),
    [FILTERS_CHANGE_VEHICLE_STATUS]: (state, action): IState => ({
        ...state,
        vehicle: {
            ...state.vehicle,
            status: {
                ...state.vehicle.status,
                [action.payload.statusType]: action.payload.value,
            }
        },
    }),
    [FILTERS_CHANGE_VEHICLE_TYPE]: (state, action): IState => ({
        ...state,
        vehicle: {
            ...state.vehicle,
            type: {
                ...state.vehicle.type,
                [action.payload.vehicleType]: action.payload.value,
            }
        },
    }),
    [FILTERS_CHANGE_VEHICLE_COLORS]: (state, action): IState => ({
        ...state,
        vehicle: {
            ...state.vehicle,
            colors: action.payload.colors,
        },
    }),
    [FILTERS_CHANGE_VEHICLE_PLATES]: (state, action): IState => ({
        ...state,
        vehicle: {
            ...state.vehicle,
            plates: action.payload.plates,
        },
    }),
    [FILTERS_CHANGE_VEHICLE_NUMBERS]: (state, action): IState => ({
        ...state,
        vehicle: {
            ...state.vehicle,
            numbers: action.payload.numbers,
        },
    }),
    [FILTERS_CHANGE_PARKING_AVAILABLE_SPACE]: (state, action): IState => ({
        ...state,
        parking: {
            ...state.parking,
            availableSpace: action.payload.availableSpace,
        },
    }),
}, initialState);
