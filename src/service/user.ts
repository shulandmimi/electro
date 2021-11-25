import request from '@/tools/request';

export function registerAccountByMail(account: string, password: string): Promise<RD<null>> {
    return request.post('/user/registerMailUser', {
        data: {
            account,
            password,
        },
    });
}
