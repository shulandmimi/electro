import request from '@/tools/request';
import platfrom from 'platform';

export function registerAccountByMail(account: string, password: string): Promise<RD<null>> {
    return request.post('/user/registerMailUser', {
        data: {
            account,
            password,
        },
    });
}

export function loginAccountByMail(account: string, password: string): Promise<RD<string>> {
    return request.post('/user/login', {
        data: {
            account,
            password,
            platform: {
                name: platfrom.name,
                version: platfrom.version,
                os: platfrom.os?.toString(),
                layout: platfrom.layout,
            },
        },
        credentials: 'include',
    });
}
