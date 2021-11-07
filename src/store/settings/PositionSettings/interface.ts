import { Area, Building, Room } from '@/service/electro/interface';

export interface PositionSettingsState {
    account?: string;
    type: ViewType;
    position?: Position;
    rooms: Position[];
}

export enum ViewType {
    One,
    Multile,
}

export interface Position {
    id: number;
    area: Area;
    building: Building;
    room: Room;
}
