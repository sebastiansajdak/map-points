import typeToReducer from 'type-to-reducer';
import { CHANGE_TAB, TAB_TOGGLE } from 'constants/actionTypes';
import { IStore } from 'types/store';
import { TABS } from 'constants/common';

type IState = IStore['tab'];

export const initialState: IState = {
    activeTab: TABS.VEHICLE,
    isOpen: false,
};

export default typeToReducer({
    [CHANGE_TAB]: (state, action): IState => ({
        ...state,
        activeTab: action.payload.activeTab,
    }),
    [TAB_TOGGLE]: (state): IState => ({
        ...state,
        isOpen: !state.isOpen,
    }),
}, initialState);
