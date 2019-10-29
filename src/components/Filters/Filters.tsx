import * as React from 'react';
import * as styles from './Filters.scss';
import cn from 'classnames';
import ParkingTab from './components/ParkingTab';
import Tabs from './components/Tabs';
import VehicleTab from './components/VehicleTab';
import { changeName, changeObjectType } from '../../actions/filters';
import { changeTab, toggleTab } from '../../actions/tabs/tabs';
import { Checkbox } from 'baseui/checkbox';
import { FormControl } from 'baseui/form-control';
import { getValueFromProperty } from 'helpers/common';
import { Input, SIZE } from 'baseui/input';
import { IStore } from 'types/store';
import { OBJECT_TYPES, TABS } from 'constants/common';
import { Spinner } from 'baseui/spinner';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
    filteredPointsCount: number;
}

const Filters = ({
    filteredPointsCount,
}: IProps) => {
    const dispatch = useDispatch();
    const {
        filters,
        mapPoints,
        tab: {
            activeTab,
            isOpen,
        }
    } = useSelector((state: IStore) => state);

    const changeMenuTab = React.useCallback((item: string) => {
        dispatch(changeTab(item));
    }, [dispatch]);

    const toggleMenuTabs = React.useCallback(() => {
        dispatch(toggleTab());
    }, [dispatch]);

    const filterByName = React.useCallback((
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeName(event.target.value));
    }, [dispatch]);

    const changePointVisibility = React.useCallback((
        objectType: string,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(changeObjectType(objectType, event.target.checked));
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <Tabs
                items={Object.keys(TABS)}
                activeTab={activeTab}
                changeTab={changeMenuTab}
                toggleTab={toggleMenuTabs}
                isOpen={isOpen}
            />
            <div className={cn(styles.filtersWrapper, isOpen && styles.open)}>
                <div className={styles.filters}>
                    <h2 className={styles.title}>
                        Filters <span className={styles.count}>{filteredPointsCount}</span>
                    </h2>
                    <FormControl label={() => 'Name'}>
                        <Input
                            value={filters.name}
                            onChange={filterByName}
                            size={SIZE.compact}
                            placeholder='Filter by name'
                        />
                    </FormControl>

                    <FormControl label={() => 'Points visibility'}>
                        <>
                            {Object.values(OBJECT_TYPES).map((objectType) =>
                                <Checkbox
                                    key={objectType}
                                    checked={getValueFromProperty(filters.objectType, objectType)}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        changePointVisibility(objectType, event)
                                    }
                                >
                                    <span className={styles.checkboxText}>
                                        <span className={styles.text}>{objectType}</span>
                                        {getValueFromProperty(mapPoints, objectType).isFetching &&
                                            <Spinner
                                                size='20px'
                                                color='#0259ff'
                                            />
                                        }
                                    </span>
                                </Checkbox>
                            )}
                        </>
                    </FormControl>

                    {activeTab === TABS.VEHICLE && 
                        <>
                            <h3 className={styles.subtitle}>Vehicle filters</h3>
                            <VehicleTab />
                        </>
                    }
                    {activeTab === TABS.PARKING && 
                        <>
                            <h3 className={styles.subtitle}>Parking filters</h3>
                            <ParkingTab />
                        </>
                    }
                    {activeTab === TABS.POI && 
                        <>
                            <h3 className={styles.subtitle}>POI filters</h3>
                            no filters
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default React.memo(Filters);
