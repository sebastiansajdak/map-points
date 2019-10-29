import { IParkingItem } from './parkingItem';
import { IPoiItem } from './poiItem';
import { IVehicleItem } from './vehicleItem';

export interface IStore {
    mapPoints: {
        vehicle: {
            items: IVehicleItem[];
            isFetching: boolean;
        },
        parking: {
            items: IParkingItem[],
            isFetching: boolean;
        },
        poi: {
            items: IPoiItem[],
            isFetching: boolean;
        },
        isError: boolean;
    },
    filters: {
        name: string;
        objectType: {
            vehicle: boolean;
            parking: boolean;
            poi: boolean;
        },
        vehicle: {
            batteryLevel: number[];
            status: {
                available: boolean;
                unavailable: boolean;
            },
            type: {
                car: boolean;
                truck: boolean;
            },
            colors: {
                id: string;
                label: string;
            }[],
            plates: string;
            numbers: string;
        },
        parking: {
            availableSpace: number[];
        },
        poi: any;
    },
    tab: {
        activeTab: string;
        isOpen: boolean;
    }
}