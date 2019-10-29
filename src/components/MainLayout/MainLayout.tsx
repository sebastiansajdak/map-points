import * as React from 'react';
import * as styles from './MainLayout.scss';
import Filters from '../Filters';
import Map from '../Map';
import { apiGetMapPoints } from '../../actions/mapPoints';
import { toggleTab } from '../../actions/tabs';
import { getPointsWithFilters } from 'helpers/common';
import { IStore } from 'types/store';
import { MAP_POINT_TYPE, OBJECT_TYPES } from 'constants/common';
import { useDispatch, useSelector } from 'react-redux';
import { Notification, KIND } from "baseui/notification";

const MainLayout = () => {
    const dispatch = useDispatch();
    const {
        filters,
        mapPoints,
        mapPoints: {
            vehicle,
            parking,
            poi
        }
    } = useSelector((state: IStore) => state);

    React.useEffect(() => {
        dispatch(apiGetMapPoints(MAP_POINT_TYPE.VEHICLE));
    }, []);

    React.useEffect(() => {
        if (vehicle.items.length) {
            dispatch(toggleTab());
        }
    }, [ vehicle ]);

    React.useEffect(() => {
        if (filters.objectType.parking && parking.items.length === 0) {
            dispatch(apiGetMapPoints(MAP_POINT_TYPE.PARKING));
        }
    }, [ filters.objectType.parking ]);

    React.useEffect(() => {
        if (filters.objectType.poi && poi.items.length === 0) {
            dispatch(apiGetMapPoints(MAP_POINT_TYPE.POI));
        }
    }, [ filters.objectType.poi ]);

    const markers = React.useMemo(() => {
        return [
            ...getPointsWithFilters(OBJECT_TYPES.VEHICLE, vehicle.items, filters),
            ...getPointsWithFilters(OBJECT_TYPES.PARKING, parking.items, filters),
            ...getPointsWithFilters(OBJECT_TYPES.POI, poi.items, filters),
        ];
    }, [ vehicle, parking, poi, filters ]);

    return (
        <section className={styles.wrapper}>
            <div className={styles.leftBox}>
                <Filters filteredPointsCount={markers.length} />
            </div>
            <div className={styles.rightBox}>
                <Map markersData={markers} />
            </div>

        {mapPoints.isError &&
            <div className={styles.notification}>
                <Notification
                    kind={KIND.negative}
                    autoHideDuration={5000}
                >
                    <span>Something went wrong. Try again later.</span>
                </Notification>
            </div>
        }
        </section>
    );
}

export default MainLayout;
