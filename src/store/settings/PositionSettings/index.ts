import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewType, PositionSettingsState, Position } from './interface';

const localState = JSON.parse(localStorage.getItem('electroSettings') || '{}');

const initialState: PositionSettingsState = {
    rooms: [],
    type: ViewType.One,
};

const electroSlice = createSlice({
    name: 'electro',
    initialState: Object.assign({}, initialState, localState) as PositionSettingsState,
    reducers: {
        syncAll(state, { payload: all }: PayloadAction<Partial<PositionSettingsState>>) {
            Object.assign(state, all);
            localStorage.setItem('electroSettings', JSON.stringify(all));
        },

        setAccount(state, { payload: account }: PayloadAction<PositionSettingsState['account'] | undefined>) {
            state.account = account;
        },

        addPosition(state, { payload: position }: PayloadAction<Position>) {
            if (state.rooms.some((item) => item.id === position.id)) return;
            else state.rooms.push({ ...position });
            localStorage.setItem('electroSettings', JSON.stringify(state));
        },
        removePosition(state, { payload: position }: PayloadAction<Position>) {
            const index = state.rooms.findIndex((item) => position.id === item.id);
            if (index === -1) return;
            state.rooms.splice(index, 1);
            localStorage.setItem('electroSettings', JSON.stringify(state));
        },
        setCurrentPosition(state, { payload: position }: PayloadAction<Position>) {
            state.position = position;
        },
    },
});

export const { syncAll, addPosition, removePosition, setCurrentPosition, setAccount } = electroSlice.actions;

export default electroSlice.reducer;
