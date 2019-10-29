import { IStore } from 'types/store';
import {
    OBJECT_TYPES,
    MARKER_ICONS,
    VEHICLE_STATUS_TYPE,
} from 'constants/common';

type IPoint = any;
type IFunc = (point: IPoint, filters: IStore['filters']) => boolean;
type IFilters = IStore['filters'];

export const getPointsWithFilters = (
    type: string,
    points: IPoint[],
    filters: IFilters,
) => {
    let filteredPoints: IPoint[] = [];

    if (type === OBJECT_TYPES.VEHICLE) {
        if (!filters.objectType.vehicle) return filteredPoints;

        filteredPoints = points.filter((point: IPoint) => {
            let shouldBeShown = true;
            [
                checkByName,
                checkBatteryLevelRange,
                checkStatus,
                checkVehicleType,
                checkVehicleColor,
                checkVehiclePlates,
                checkVehicleNumbers
            ].some((func: IFunc) => {
                if (!func(point, filters)) {
                    shouldBeShown = false;
                    return false;
                }
            });

            return shouldBeShown;
        });

        return filteredPoints;
    } else if (type === OBJECT_TYPES.PARKING) {
        if (!filters.objectType.parking) return filteredPoints;

        filteredPoints = points.filter((point: IPoint) => {
            let shouldBeShown = true;
            [checkByName, checkByParkingSpace].some((func: IFunc) => {
                if (!func(point, filters)) {
                    shouldBeShown = false;
                    return false;
                }
            });

            return shouldBeShown;
        });

        return filteredPoints;
    } else if (type === OBJECT_TYPES.POI) {
        if (!filters.objectType.poi) return filteredPoints;

        filteredPoints = points.filter((point: IPoint) => {
            let shouldBeShown = true;
            [checkByName].some((func: IFunc) => {
                if (!func(point, filters)) {
                    shouldBeShown = false;
                    return false;
                }
            });

            return shouldBeShown;
        });

        return filteredPoints;
    }

    return filteredPoints;
}

export const checkByName = (point: IPoint, filters: IFilters) => {
    const name = point.name.toLowerCase();

    return name.includes(filters.name.toLowerCase());
}

export const checkBatteryLevelRange = (point: IPoint, filters: IFilters) =>
    point.batteryLevel >= filters.vehicle.batteryLevel[0] &&
    point.batteryLevel <= filters.vehicle.batteryLevel[1];

export const checkStatus = (point: IPoint, filters: any) =>
    filters.vehicle.status[point.status];

export const checkVehicleType = (point: IPoint, filters: any) =>
    filters.vehicle.type[point.type];

export const checkVehicleColor = (point: IPoint, filters: IFilters) => {
    if (filters.vehicle.colors.length === 0) return true;
    return filters.vehicle.colors.find((color: any) => color.id === point.color)
}

export const checkVehiclePlates = (point: IPoint, filters: IFilters) =>
    point.plates.includes(filters.vehicle.plates.toLowerCase());

export const checkVehicleNumbers = (point: IPoint, filters: IFilters) =>
    point.numbers.includes(filters.vehicle.numbers.toLowerCase());

export const checkByParkingSpace = (point: IPoint, filters: IFilters) =>
    point.availableSpacesCount >= filters.parking.availableSpace[0] &&
    point.availableSpacesCount <= filters.parking.availableSpace[1];

export const getValueFromProperty = (obj: any, property: string) => {
    if (obj.hasOwnProperty(property)) {
        return obj[property];
    }

    return null;
}

export const getDataForTooltip = (point: any) => ({
    discriminator: point.discriminator,
    name: point.name,
    status: point.status,
    batteryLevel: point.batteryLevel,
    plates: point.plates,
    availableSpacesCount: point.availableSpacesCount,
});

export const getIconForMarker = (point: any) => {
    let icon = null;

    if (point.discriminator === OBJECT_TYPES.VEHICLE) {
        if (point.status === VEHICLE_STATUS_TYPE.AVAILABLE) {
            icon = MARKER_ICONS.CAR_AVAILABLE;
        } else {
            icon = MARKER_ICONS.CAR_UNAVAILABLE;
        }
    } else if (point.discriminator === OBJECT_TYPES.PARKING) {
        icon = MARKER_ICONS.PARKING;
    } else {
        icon = MARKER_ICONS.POI
    }

    return icon;
}
