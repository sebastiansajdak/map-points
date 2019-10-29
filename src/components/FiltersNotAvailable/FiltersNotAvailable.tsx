import * as React from 'react';
import * as styles from './FiltersNotAvailable.scss';

const FiltersNotAvailable = () =>
    <div className={styles.wrapper}>
        Filters are not available now. Check the points visibility section.
    </div>;

export default React.memo(FiltersNotAvailable);
