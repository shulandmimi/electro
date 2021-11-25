interface RD<T = never> {
    /**
     * 200 成功
     **/
    code: number;
    msg?: string;
    data: T;
}
