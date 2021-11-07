import {} from 'react';
import { Card, Tag } from 'antd';
import { Electro } from '@/service/electro';

interface ViewElectroItem {
    electro: number;
    id: number;
    createdAt: string;
    position: Electro['position'];
}

export default function ViewElectroItem({ electro = 0, createdAt, position }: ViewElectroItem) {

    const renderCardHeader = () => {
        return (
            <>
                <span style={{ fontSize: '24px' }}>
                    <Tag>{position?.room}</Tag>
                </span>
                <span style={{ fontSize: '13px', marginLeft: '10px' }}>
                    {position?.building} {position?.area}
                </span>
            </>
        );
    };

    return (
        <Card title={renderCardHeader()} bordered>
            <p>
                电量: <Tag>{electro}</Tag>
            </p>
            <p>
                最后获取时间: <Tag>{new Date(createdAt || Date.now()).toLocaleString()}</Tag>
            </p>
        </Card>
    );
}
