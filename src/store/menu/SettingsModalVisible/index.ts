import { createSlice } from '@reduxjs/toolkit';
import { PositionSettingsModalState } from './interface';

export { PositionSettingsModalState };

const initialState: PositionSettingsModalState = {
    positionVisible: false,
    registerVisible: false,
    loginVisible: false,
    aboutVisible: false,
};

const SettingsModal = createSlice({
    name: 'SettingsModal',
    initialState: { ...initialState },
    reducers: {
        showPosition(state) {
            state.positionVisible = true;
        },
        closePosition(state) {
            state.positionVisible = false;
        },
        showRegister(state) {
            state.registerVisible = true;
        },
        closeRegister(state) {
            state.registerVisible = false;
        },
        showLogin(state) {
            state.loginVisible = true;
        },
        closeLogin(state) {
            state.loginVisible = false;
        },
        showAbout(state) {
            state.aboutVisible = true;
        },
        closeAbout(state) {
            state.aboutVisible = false;
        },
    },
});

export const { showPosition, closePosition, showRegister, closeRegister, showLogin, closeLogin, showAbout, closeAbout } = SettingsModal.actions;
export default SettingsModal.reducer;
