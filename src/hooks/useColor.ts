import { useMemo } from 'react';
import { random } from 'lodash';

const defaultColor = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

export default function useColor(colors?: string[]) {
    return useMemo(() => {
        const c = colors || defaultColor;
        return c[random(0, c.length, false)];
    }, [colors]);
}
