import * as React from 'react';
import { FormControl } from 'baseui/form-control';
import { Slider } from 'baseui/slider';
import { useDispatch, useSelector } from 'react-redux';
import { changeParkingAvailableSpace } from '../../../../actions/filters';
import FiltersNotAvailable from '../../../FiltersNotAvailable';
import { IStore } from 'types/store';
import { IParkingItem } from 'types/parkingItem';

const ParkingTab = () => {
    const dispatch = useDispatch();
    const {
        filters,
        mapPoints: {
            parking: {
                items: parkingsItems 
            }
        }
    } = useSelector((state: IStore) => state);

    const max = React.useMemo(() => {
        return parkingsItems.reduce(
            (res: number, next: IParkingItem) =>
                res >= next.spacesCount ? res : next.spacesCount, 0);
    }, [ parkingsItems ]);

    const filterByAvailableSpace = React.useCallback((event: any) => {
        dispatch(changeParkingAvailableSpace(event.value));
    }, [dispatch]);

    return (
        filters.objectType.parking ?
            max > 0 ?
                <FormControl label='Available parking space'>
                    <Slider
                        value={[
                            filters.parking.availableSpace[0],
                            filters.parking.availableSpace[1] > max
                                ? max
                                : filters.parking.availableSpace[1]]
                        }
                        onChange={filterByAvailableSpace}
                        min={0}
                        max={max}
                        step={1}
                    />
                </FormControl>
                :
                null
            :
            <FiltersNotAvailable />
    );
}

export default React.memo(ParkingTab);
