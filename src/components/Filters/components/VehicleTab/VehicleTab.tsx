import * as React from 'react';
import FiltersNotAvailable from '../../../FiltersNotAvailable';
import { Checkbox } from 'baseui/checkbox';
import { FormControl } from 'baseui/form-control';
import { getValueFromProperty } from 'helpers/common';
import { Input } from 'baseui/input';
import { IStore } from 'types/store';
import { IVehicleItem } from 'types/vehicleItem';
import { Select, SIZE, TYPE } from 'baseui/select';
import { Slider } from 'baseui/slider';
import { useDispatch, useSelector } from 'react-redux';
import { VEHICLE_STATUS_TYPE, VEHICLE_TYPE } from 'constants/common';
import {
    changeBatteryLevel,
    changeVehicleStatus,
    changeVehicleType,
    changeVehicleColors,
    changeVehiclePlates,
    changeVehicleNumbers,
} from '../../../../actions/filters';

const VehicleTab = () => {
    const dispatch = useDispatch();
    const {
        filters,
        mapPoints: {
            vehicle: {
                items: vehicleItems,
            }
        }
    } = useSelector((state: IStore) => state);

    const colors = React.useMemo(() => {
        if (!vehicleItems) return [];

        const uniqueColors = Array.from(
            new Set(vehicleItems.map((vehicle: IVehicleItem) => vehicle.color))
        );

        return uniqueColors.map((color: string) => ({
            id: color,
            label: color,
        }));
    }, [ vehicleItems ]);

    const filterByBatteryLevel = React.useCallback((event: any) => {
        dispatch(changeBatteryLevel(event.value));
    }, [dispatch]);

    const filterByStatus = React.useCallback((
        status: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeVehicleStatus(status, event.target.checked));
    }, [dispatch]);

    const filterByType = React.useCallback((
        type: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeVehicleType(type, event.target.checked));
    }, [dispatch]);

    const filterByColor = React.useCallback((color: any) => {
        dispatch(changeVehicleColors(color.value))
    }, [dispatch]);

    const filterByPlates = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeVehiclePlates(event.target.value));
    }, [dispatch]);

    const filterByNumbers = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeVehicleNumbers(event.target.value));
    }, [dispatch]);

    return (
        filters.objectType.vehicle ?
            <>
                <FormControl label='Battery level'>
                    <Slider
                        value={filters.vehicle.batteryLevel}
                        onChange={filterByBatteryLevel}
                        min={0}
                        max={100}
                        step={1}
                    />
                </FormControl>

                <FormControl label='Status'>
                    <>
                        {Object.values(VEHICLE_STATUS_TYPE).map((type: string) =>
                            <Checkbox
                                key={type}
                                checked={getValueFromProperty(filters.vehicle.status, type)}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    filterByStatus(type, event)
                                }
                            >
                                {type}
                            </Checkbox>
                        )}
                    </>
                </FormControl>

                <FormControl label='Type'>
                    <>
                        {Object.values(VEHICLE_TYPE).map((type: string) =>
                            <Checkbox
                                key={type}
                                checked={getValueFromProperty(filters.vehicle.type, type)}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    filterByType(type, event)
                                }
                            >
                                {type}
                            </Checkbox>
                        )}
                    </>
                </FormControl>

                <FormControl label='Color'>
                    <Select
                        size={SIZE.compact}
                        options={colors}
                        value={filters.vehicle.colors}
                        multi
                        searchable={false}
                        type={TYPE.search}
                        placeholder='Filter by color'
                        onChange={filterByColor}
                    />
                </FormControl>

                <FormControl label='Plates'>
                    <Input
                        value={filters.vehicle.plates}
                        onChange={filterByPlates}
                        size={SIZE.compact}
                        placeholder='Filter by plates'
                    />
                </FormControl>

                <FormControl label='Numbers'>
                    <Input
                        value={filters.vehicle.numbers}
                        onChange={filterByNumbers}
                        size={SIZE.compact}
                        placeholder='Filter by side numbers'
                    />
                </FormControl>
            </>
            :
            <FiltersNotAvailable />
    );
}

export default React.memo(VehicleTab);
