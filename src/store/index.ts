import { configureStore, combineReducers } from '@reduxjs/toolkit';
import PositionSettings, { PositionSettingsState } from './settings/PositionSettings';
import PositionSettingsModal, { PositionSettingsModalState } from './menu/SettingsModalVisible';
import Menu, { MenuState } from './menu/index';
export interface State {
    PositionSettings: PositionSettingsState;
    PositionSettingsModal: PositionSettingsModalState;
    Menu: MenuState;
}
const reducer = combineReducers({
    PositionSettings,
    PositionSettingsModal,
    Menu,
});

export const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
