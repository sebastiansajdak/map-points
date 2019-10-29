import {
    CHANGE_TAB,
    TAB_TOGGLE,
} from 'constants/actionTypes';

export const changeTab = (newTabName: string) => ({
    type: CHANGE_TAB,
    payload: {
        activeTab: newTabName,
    },
});

export const toggleTab = () => ({
    type: TAB_TOGGLE,
});
