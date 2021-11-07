import { useEffect, useState, useRef, ReactNode } from 'react';
import cs from 'classnames';
import Menu, { MenuFloor, MenuOption, MenuItem } from './menu';
import Item from './component/item';
import styles from './index.module.scss';

interface MenuListProps<T> extends MenuOption {
    renderMenuItem: (options: MenuItem<T>) => ReactNode;
    menus: T[];
    visible: boolean;
    onClose: () => void;
    onClick: () => void;
}

export { Item };

export default function MenuList<T>(rawProps: MenuListProps<T>) {
    const originRef = useRef<HTMLDivElement>(null);
    const [menuInstance, setMenuInstance] = useState<Menu | null>(null);
    const { renderMenuItem, menus, onClose, visible, onClick, ...menuOption } = rawProps;
    const [menuList, setMenuList] = useState<MenuFloor<T>[]>();
    useEffect(() => {
        if (!menuInstance) {
            setMenuInstance(new Menu(menuOption));
            return;
        }
        const el = originRef.current!;
        const offset = menuInstance.correctPoint({ x: 0, y: 0 }, { width: el.clientWidth, height: el.clientHeight });
        setMenuList(menuInstance.calcBorderMargin<T>(menus, offset));
    }, [originRef.current, menuInstance]);

    return (
        <div className={styles.root}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div onClick={onClick} className={cs(styles.hotArea, { [styles.viewBackground]: visible })}></div>
                <div className={cs(styles.menuList, { [styles.visible]: visible })} ref={originRef}>
                    {menuList?.map((item) => item.items.map((options) => renderMenuItem(options)))}
                </div>
            </div>
        </div>
    );
}
