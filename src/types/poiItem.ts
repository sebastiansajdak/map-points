export interface IPoiItem {
    id: string;
    discriminator: string;
    name: string;
    location: {
        lat: number;
        lng: number;
    }
}

export interface IPoiServerItem {
    id: string;
    discriminator: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    }
}