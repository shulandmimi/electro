import { useState } from 'react';

interface RequestState<T> {
    data?: T;
    error: any;
    loading: boolean;
}

interface RequestResponse<P extends unknown[], R> {
    state: Partial<RequestState<R>>;
    run: (...arg: P) => Promise<void>;
}

export default function useRequest<P extends unknown[], R>(callback: (...arg: P) => Promise<R>): RequestResponse<P, R> {
    const [state, setState] = useState<Partial<RequestState<R>>>({ data: undefined, error: undefined, loading: false });
    async function fetchHandler(...arg: P) {
        setState({ loading: true });
        try {
            const data = await callback(...arg);
            setState({ data, loading: false });
        } catch (error: any) {
            setState({ error: `${error.type}: ${error.message}`, loading: false });
        }
    }

    return {
        state,
        run: fetchHandler,
    };
}
