interface RD<T = never> {
    code: number;
    msg?: string;
    data: T;
}