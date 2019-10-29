import { FULFILLED } from 'constants/common';
import {
    GET_VEHICLES,
    GET_PARKINGS,
    GET_POI,
} from 'constants/actionTypes';
import {
    vehicleParser,
    parkingParser,
    poiParser,
} from './mapPoints';

export default {
    [`${GET_VEHICLES}_${FULFILLED}`]: vehicleParser,
    [`${GET_PARKINGS}_${FULFILLED}`]: parkingParser,
    [`${GET_POI}_${FULFILLED}`]: poiParser,
}
