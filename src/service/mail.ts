import request from '@/tools/request';

export function subscrirbeMail(positionId: number): Promise<RD<null>> {
    return request.post('/mail/subscribeMail', {
        data: {
            positionId,
        },
        credentials: 'include',
    });
}

export function deSubscribeMail(positionId: number): Promise<RD<null>> {
    return request.get('/mail/deSubscribeMail', {
        params: {
            positionId,
        },
        credentials: 'include',
    });
}
