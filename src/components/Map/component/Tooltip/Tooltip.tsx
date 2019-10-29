import * as React from 'react';
import * as styles from './Tooltip.scss';

interface IProps {
    data: {
        discriminator: string;
        name: string;
        status?: string;
        batteryLevel?: number;
        plates?: string;
        availableSpacesCount?: number;
    }
}

const Tooltip = ({
    data
}: IProps) =>
    <div className={styles.wrapper}>
        <div className={styles.name}>{data.discriminator}</div>
        <div>
            <div className={styles.box}>
                <div className={styles.title}>Name</div>
                <div className={styles.value}>{data.name}</div>
            </div>
            
            {data.status &&
                <div className={styles.box}>
                    <div className={styles.title}>Status</div>
                    <div className={styles.value}>{data.status}</div>
                </div>
            }

            {data.batteryLevel &&
                <div className={styles.box}>
                    <div className={styles.title}>Battery level</div>
                    <div className={styles.value}>{data.batteryLevel}</div>
                </div>
            }

            {data.plates &&
                <div className={styles.box}>
                    <div className={styles.title}>Plates</div>
                    <div className={styles.value}>{data.plates}</div>
                </div>
            }

            {data.availableSpacesCount &&
                <div className={styles.box}>
                    <div className={styles.title}>Available space</div>
                    <div className={styles.value}>{data.availableSpacesCount}</div>
                </div>
            }
        </div>
    </div>;

export default Tooltip;
