export interface IParkingItem {
    id: string;
    discriminator: string;
    name: string;
    availableSpacesCount: number;
    spacesCount: number;
    location: {
        lat: number;
        lng: number;
    }
}

export interface IParkingServerItem {
    id: string;
    discriminator: string;
    name: string;
    availableSpacesCount: number;
    spacesCount: number;
    location: {
        latitude: number;
        longitude: number;
    }
}