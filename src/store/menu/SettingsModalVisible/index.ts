import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PositionSettingsModalState } from './interface';

export { PositionSettingsModalState };

const initialState: PositionSettingsModalState = {
    positionVisible: false,
    registerVisible: false,
    loginVisible: false,
    aboutVisible: false,
    /** 新手引导 */
    tutorialVisible: false,
};

const TUTORIAL_IN_LOCAL = 'TUTORIAL_VISIBLE';

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
        showTutorial(state) {
            if (localStorage.getItem(TUTORIAL_IN_LOCAL)) return;
            localStorage.setItem(TUTORIAL_IN_LOCAL, '1');
            state.tutorialVisible = true;
        },
        showTutorialByForce(state) {
            state.tutorialVisible = true;
        },
        closeTutorial(state) {
            state.tutorialVisible = false;
        },
    },
});

export const {
    showPosition,
    closePosition,
    showRegister,
    closeRegister,
    showLogin,
    closeLogin,
    showAbout,
    closeAbout,
    showTutorial,
    closeTutorial,
    showTutorialByForce,
} = SettingsModal.actions;
export default SettingsModal.reducer;
