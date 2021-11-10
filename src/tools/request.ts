import request from 'umi-request';

export const BAHSE_URL = {
    development: 'http://127.0.0.1:12306',
    production: 'http://electroapi.wdbke.top',
}[process.env.NODE_ENV!];

request.extendOptions({
    errorHandler() {},
});

// const common = axios.create({ baseURL: 'http://127.0.0.1:12306' });

// common.interceptors.response.use((response) => {
//     try {
//         console.log(`${response.config.url} ${response.status}`);
//         return Promise.resolve(response.data);
//     } catch (error: any) {
//         return Promise.resolve({ code: 400, msg: `${error.type}: ${error.message}`, stack: error.stack });
//     }
// });

request.interceptors.request.use((url, options) => {
    return {
        url: BAHSE_URL + url,
        options,
    };
});

export default request;
