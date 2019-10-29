import {
    FILTERS_CHANGE_NAME,
    FILTERS_CHANGE_OBJECT_TYPE,
    FILTERS_CHANGE_BATTERY_LEVEL,
    FILTERS_CHANGE_VEHICLE_STATUS,
    FILTERS_CHANGE_VEHICLE_TYPE,
    FILTERS_CHANGE_VEHICLE_COLORS,
    FILTERS_CHANGE_VEHICLE_PLATES,
    FILTERS_CHANGE_VEHICLE_NUMBERS,
    FILTERS_CHANGE_PARKING_AVAILABLE_SPACE,
} from 'constants/actionTypes';

export const changeName = (name: string) => ({
    type: FILTERS_CHANGE_NAME,
    payload: {
        name,
    },
});

export const changeObjectType = (objectType: string, value: boolean) => ({
    type: FILTERS_CHANGE_OBJECT_TYPE,
    payload: {
        objectType,
        value,
    },
});

export const changeBatteryLevel = (batteryLevel: number[]) => ({
    type: FILTERS_CHANGE_BATTERY_LEVEL,
    payload: {
        batteryLevel,
    },
});

export const changeVehicleStatus = (statusType: string, value: boolean) => ({
    type: FILTERS_CHANGE_VEHICLE_STATUS,
    payload: {
        statusType,
        value,
    },
});

export const changeVehicleType = (vehicleType: string, value: boolean) => ({
    type: FILTERS_CHANGE_VEHICLE_TYPE,
    payload: {
        vehicleType,
        value,
    },
});

export const changeVehicleColors = (colors: { id: string; label: string }[]) => ({
    type: FILTERS_CHANGE_VEHICLE_COLORS,
    payload: {
        colors,
    },
});

export const changeVehiclePlates = (plates: string) => ({
    type: FILTERS_CHANGE_VEHICLE_PLATES,
    payload: {
        plates,
    },
});

export const changeVehicleNumbers = (numbers: string) => ({
    type: FILTERS_CHANGE_VEHICLE_NUMBERS,
    payload: {
        numbers,
    },
});

export const changeParkingAvailableSpace = (availableSpace: number[]) => ({
    type: FILTERS_CHANGE_PARKING_AVAILABLE_SPACE,
    payload: {
        availableSpace,
    },
});
