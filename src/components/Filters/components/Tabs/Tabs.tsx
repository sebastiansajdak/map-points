import * as React from 'react';
import * as styles from './Tabs.scss';
import CarIcon from 'resources/images/tab-car.svg';
import cn from 'classnames';
import EyeIcon from 'resources/images/eye.svg';
import ParkingIcon from 'resources/images/tab-parking.svg';
import PoiIcon from 'resources/images/tab-poi.svg';
import { LOGO_URL, TABS } from 'constants/common';

interface IProps {
    items: string[];
    activeTab: string;
    changeTab: (item: string) => void;
    toggleTab: () => void;
    isOpen: boolean;
}

type IIcons = {
    [name: string]: JSX.Element;
}

const ICONS = {
    [TABS.VEHICLE]: <CarIcon className={styles.icon} />,
    [TABS.PARKING]: <ParkingIcon className={styles.icon} />,
    [TABS.POI]: <PoiIcon className={styles.icon} />,
} as IIcons;

const Tabs = ({
    items,
    activeTab,
    changeTab,
    toggleTab,
    isOpen,
}: IProps) =>
    <div className={styles.wrapper}>
        <ul className={cn(styles.tabs, styles.topTabs)}>
            <li className={cn(styles.item, styles.logo)}>
                <span className={styles.imgWrapper}>
                    <img
                        className={styles.img}
                        src={LOGO_URL}
                        alt='Company logo'
                    />
                </span>
            </li>
            {items.map((item: string) =>
                <li
                    key={`tab-${item}`}
                    className={cn(styles.item, activeTab === item && styles.active)}
                    onClick={() => changeTab(item)}
                >
                    <span className={styles.imgWrapper}>
                        {ICONS[item]}
                    </span>
                </li>
            )}
        </ul>
        <ul className={cn(styles.tabs, styles.bottomTabs)}>
            <li
                className={cn(styles.item, !isOpen && styles.active)}
                onClick={toggleTab}
            >
                <span className={styles.imgWrapper}>
                    <EyeIcon className={styles.icon} />
                </span>
            </li>
        </ul>
    </div>;

export default React.memo(Tabs);
