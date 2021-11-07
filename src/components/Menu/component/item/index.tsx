import { PropsWithChildren, CSSProperties } from 'react';
import styles from './index.scss';

interface MenuItemProps extends PropsWithChildren<{}> {
    x: number;
    y: number;
    style?: CSSProperties;
}

export default function Item({ x, y, children, style }: MenuItemProps) {
    return (
        <div style={{ left: x + 'px', top: y + 'px', ...style }} className={styles.item}>
            {children}
        </div>
    );
}
