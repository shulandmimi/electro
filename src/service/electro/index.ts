import request, { BAHSE_URL } from '@/tools/request';
import qs from 'query-string';
import { Area, Building, Room, ResponseArea, ResponseBuilding, QueryType } from './interface';
import { Position } from '@/store/settings/PositionSettings/interface';

const QUERY_ID = '0030000000002501';

/** 查询区域 */
export function fetch_electro_area_list(account: string) {
    return fetch_electro_common<ResponseArea>({ query_elec_area: { aid: QUERY_ID, account } }, QueryType.Area);
}

/** 查询楼栋 */
export function fetch_electro_building_list(account: string, area: Area) {
    return fetch_electro_common<ResponseBuilding>({ query_elec_building: { aid: QUERY_ID, account: account, area: area } }, QueryType.Building);
}

/** 校验房间 */
export function checkRoom(account: string, area: Area, building: Building, room: Room) {
    return request.post('/electro/checkRoom', {
        data: {
            account,
            area,
            building,
            room,
        },
    });
}

export interface Electro {
    electro: number;
    id: number;
    createdAt: string;
    position: Area & Building & Room;
}

/** 查询电量 */
export function fetch_electro<T = Electro[]>(account: string, positions: Omit<Position, 'id'>[]) {
    return request.post<RD<T>>('/electro/queryElectro', {
        data: {
            account,
            positions,
        },
    });
}

async function fetch_electro_common<T>(data: any, type: QueryType) {
    return request.post<T>('/electro/queryAreaList', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Accept: '',
        },
        data: qs.stringify({
            jsondata: JSON.stringify(data),
            funname: type,
            json: true,
        }),
        params: {
            type,
        },
    });
}
