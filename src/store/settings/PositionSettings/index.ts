import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEqual, isUndefined, omit } from 'lodash';
import { ViewType, PositionSettingsState, Position } from './interface';

export { PositionSettingsState };

const localState = JSON.parse(localStorage.getItem('electroSettings') || '{}');
let uuid = Array.isArray(localState.rooms) ? localStorage.rooms?.reduce((r: number, i: Position) => (i.id > r ? i.id : r), 0) : 0;

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
            if (state.rooms.some((item) => isEqual(omit(item, 'id'), position))) return;
            if (isUndefined(position.id)) state.rooms.push({ ...position, id: uuid++ });
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

export const { syncAll, addPosition, removePosition, setCurrentPosition } = electroSlice.actions;

export default electroSlice.reducer;
