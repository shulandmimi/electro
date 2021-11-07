import { cloneDeep } from 'lodash';

interface Point {
    x: number;
    y: number;
}

interface Race {
    width: number;
    height: number;
}

interface MenuItemIcon {
    width: number;
    height: number;
}

export interface MenuOption {
    margin: [x: number, y: number];
    radius: number;
    icon: MenuItemIcon;
}

interface MenuState extends MenuOption {
}

export interface MenuItem<T> {
    position: Point;
    race: Race;
    payload: T;
}


export interface MenuFloor<T> {
    space: [top: number, bottom: number];
    items: MenuItem<T>[],
    floor: number;
}

function getOffset(el: HTMLElement, point: Point = { x: 0, y: 0 }): Point {
    if (el.offsetParent && el.offsetParent instanceof HTMLElement) {
        return getOffset(el.offsetParent, {
            x: point.x + el.offsetLeft,
            y: point.y + el.offsetTop,
        });
    } else {
        return point;
    }
}

export default class Menu {
    state!: MenuState;
    constructor(protected rawOptions: MenuState) {
        this.state = Object.assign({}, cloneDeep(rawOptions));
    }

    /** 计算边缘边距 */
    calcBorderMargin<T>(menuList: T[], centerOfCircle: Point) {
        const {
            icon: { width, height },
            radius,
            margin: [marginX, marginY],
        } = this.state;
        const formatMenuList: MenuFloor<T>[] = [];
        let floor = 0;
        while (menuList.length) {
            let items = 0;
            let result = marginX;
            const floorRadius = radius + ((marginY + height) * floor)
            const raceAngle = this.calcPointSpace(floorRadius, width);
            const menuFloor: MenuFloor<T> = {
                space: [0, 0],
                items: [],
                floor,
            };
            formatMenuList.push(menuFloor);
            while (result + raceAngle + marginX < 90 && menuList.length > items) {
                result += raceAngle + marginX;
                items ++;
            }

            const remainMargin = (90 - result) / 2;
            menuFloor.space = [remainMargin, remainMargin];
            result = 180 + (marginX + remainMargin) + raceAngle / 2;
            for(let i = 0; i < items; i ++) {
                const payload = menuList.shift()!;
                const position = this.correctPoint(this.calcPointFromPoint(centerOfCircle, floorRadius, result), { width, height });
                result += raceAngle + marginX ;
                menuFloor.items.push({ position, race: { width, height }, payload });
            }
            floor ++;
        }

        return formatMenuList;
    }

    /** 根据两个坐标计算角度 */
    calcAngleFromDoublePoint(x: Point, y: Point) {
        return (Math.atan2(y.x - x.x, y.y - x.y) * 180) / Math.PI;
    }

    /** 根据点计算另外一个点 */
    calcPointFromPoint(origin: Point, r: number, angle: number) {
        return {
            x: origin.x + r * Math.cos((angle * Math.PI) / 180),
            y: origin.y + r * Math.sin((angle * Math.PI) / 180),
        };
    }

    /** 一个圆上两个点的连线的夹角 */
    calcPointSpace(radius: number, pointWidth: number) {
        return (Math.acos((radius ** 2 + radius ** 2 - pointWidth ** 2) / (2 * radius * radius)) * 180) / Math.PI;
    }

    /** 计算两个点的中心 */
    correctPoint(origin: Point, race: Race) {
        return {
            x: origin.x - race.width / 2,
            y: origin.y - race.height / 2,
        };
    }
}
