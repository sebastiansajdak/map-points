import {
    API_METHODS,
    API_MAP_POINTS_URL,
} from 'constants/common';

export const apiGetMapPoints = (objectType: string) => ({
    type: `GET_${objectType}`,
    payload: {
        method: API_METHODS.GET,
        url: `${API_MAP_POINTS_URL}${objectType}`,
    },
    isRequest: true,
});
