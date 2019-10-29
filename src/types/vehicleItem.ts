export interface IVehicleItem {
    id: string;
    discriminator: string;
    name: string;
    type: string;
    status: string;
    batteryLevel: number;
    color: string;
    plates: string;
    numbers: string;
    location: {
        lat: number;
        lng: number
    }
}

export interface IVehicleServerItem {
    id: string;
    discriminator: string;
    name: string;
    type: string;
    status: string;
    batteryLevelPct: number;
    color: string;
    platesNumber: string;
    sideNumber: string;
    location: {
        latitude: number;
        longitude: number;
    }
}