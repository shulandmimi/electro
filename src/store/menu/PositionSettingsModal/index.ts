import { createSlice } from '@reduxjs/toolkit';
import { PositionSettingsModalState } from './interface';

export { PositionSettingsModalState };

const initialState: PositionSettingsModalState = {
    visible: false,
};

const SettingsModal = createSlice({
    name: 'SettingsModal',
    initialState: { ...initialState },
    reducers: {
        show(state) {
            state.visible = true;
        },
        close(state) {
            state.visible = false;
        },
    },
});

export const { show, close } = SettingsModal.actions;
export default SettingsModal.reducer;
