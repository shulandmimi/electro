import { Card, Tag } from 'antd';
import { Electro } from '@/service/electro';
import { useColor } from '@/hooks';

interface ViewElectroItem {
    electro: number;
    id: number;
    createdAt: string;
    position: Electro['position'];
}

export default function ViewElectroItem({ electro = 0, createdAt, position }: ViewElectroItem) {
    const color = useColor();
    const renderCardHeader = () => {
        return (
            <>
                <span style={{ fontSize: '24px' }}>
                    <Tag style={{ fontSize: '28px' }} color={color}>
                        {position?.room}
                    </Tag>
                </span>
                <span style={{ fontSize: '13px', marginLeft: '10px' }}>
                    {position?.building} {position?.area}
                </span>
            </>
        );
    };

    const electroLevel = (electro: number) => {
        if (electro <= 40) {
            return 'red';
        } else if (electro <= 50) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    return (
        <Card title={renderCardHeader()} bordered>
            <p>
                电量: <Tag color={electroLevel(electro)}>{electro}</Tag>
            </p>
            <p>
                最后获取时间: <Tag>{new Date(createdAt || Date.now()).toLocaleString()}</Tag>
            </p>
        </Card>
    );
}
