import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
    visible: boolean;
}

const initialState: MenuState = {
    visible: false,
};

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        showMenu(state) {
            state.visible = true;
        },

        hideMenu(state) {
            state.visible = false;
        },
    },
});

export const { showMenu, hideMenu } = menu.actions;

export default menu.reducer;
