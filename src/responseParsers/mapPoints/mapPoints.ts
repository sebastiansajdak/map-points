import { IParkingItem, IParkingServerItem } from 'types/parkingItem';
import { IPoiItem, IPoiServerItem } from 'types/poiItem';
import { IVehicleItem, IVehicleServerItem } from 'types/vehicleItem';

export const vehicleParser = (
    { data }: { data: { objects: IVehicleServerItem[] } }
): IVehicleItem[] =>
    data.objects.map((point: IVehicleServerItem) => ({
        id: point.id,
        discriminator: point.discriminator,
        name: point.name,
        type: point.type.toLowerCase(),
        status: point.status.toLowerCase(),
        batteryLevel: point.batteryLevelPct,
        color: point.color.toLowerCase(),
        plates: point.platesNumber.toLowerCase(),
        numbers: point.sideNumber.toLowerCase(),
        location: {
            lat: point.location.latitude,
            lng: point.location.longitude,
        }
    }));

export const parkingParser = (
    { data }: { data: { objects: IParkingServerItem[] }}
): IParkingItem[] =>
    data.objects.map((point: IParkingServerItem) => ({
        id: point.id,
        discriminator: point.discriminator,
        name: point.name,
        availableSpacesCount: point.availableSpacesCount,
        spacesCount: point.spacesCount,
        location: {
            lat: point.location.latitude,
            lng: point.location.longitude,
        }
    }));

export const poiParser = (
    { data }: { data: { objects: IPoiServerItem[] }}
): IPoiItem[] =>
    data.objects.map((point: IPoiServerItem) => ({
        id: point.id,
        discriminator: point.discriminator,
        name: point.name,
        location: {
            lat: point.location.latitude,
            lng: point.location.longitude,
        }
    }));
