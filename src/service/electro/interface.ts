/** 范围 */
export interface Area {
    /** id */
    area: string;
    /** 名称 */
    areaname: string;
}

export interface ResponseArea {
    query_elec_area: {
        /**  */
        retcode: string;
        /** 错误信息 */
        errmsg: string;
        /**  */
        aid: string;
        /** 用户 */
        account: string;
        areatab: Area[];
    };
}

/** 建筑 */
export interface Building {
    /** id */
    buildingid: string;
    /** 名称 */
    building: string;
}

export interface ResponseBuilding {
    query_elec_building: {
        retcode: string;
        errmsg: string;
        aid: string;
        account: string;
        area: Area;
        buildingtab: Building[];
    };
}

export interface Room {
    roomid: string;
    room: string;
}

export enum QueryType {
    Area = 'synjones.onecard.query.elec.area',
    Building = 'synjones.onecard.query.elec.building',
    Electro = 'synjones.onecard.query.elec.roominfo',
}
