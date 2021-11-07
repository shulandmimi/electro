import { useRef, useState } from 'react';
import { SelectProps } from 'antd';

type VT = string | number | string[] | number[];

export default function useSelect<T extends SelectProps<VT>, P extends unknown[], K extends keyof T>(
    fetch: (...arg: P) => T[] | Promise<T[]>,
    defaultSelect?: T,
) {
    const [state, setState] = useState({
        data: [],
        value: [],
        labels: [],
        loading: false,
    });

    async function loadData(...arg: P) {
        setState({ ...state, loading: true });
        const data = await fetch(...arg);
        setState({ ...state, data: data as any, loading: false });
    }

    const onUpdateHandler: SelectProps<VT>['onChange'] = (value, options) => {
        setState({
            ...state,
            value: value as any,
            labels: Array.isArray(options) ? (options as any[]).map((item) => item.data!) : (options as any)?.data,
        });
    };

    return {
        props: {
            onChange: onUpdateHandler,
        },
        options: state.data,
        data: {
            value: state.value,
            label: state.labels,
        },
        loading: state.loading,
        run: loadData,
    };
}
