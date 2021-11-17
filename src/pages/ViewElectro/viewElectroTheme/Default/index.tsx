import { Card, Tag, Popover, Button } from 'antd';
import { Electro } from '@/service/electro';
import { useColor } from '@/hooks';
import { CloseCircleOutlined } from '@ant-design/icons';

interface ViewElectroItem {
    electro: number;
    id: number;
    createdAt: string;
    position: Electro['position'];
    onDelete: () => void;
}

export default function ViewElectroItem({ electro = 0, createdAt, position, onDelete }: ViewElectroItem) {
    const color = useColor();
    const renderCardHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: '24px' }}>
                        <Tag style={{ fontSize: '28px' }} color={color}>
                            {position?.room}
                        </Tag>
                    </span>
                    <span style={{ fontSize: '13px', marginLeft: '10px' }}>
                        {position?.building} {position?.area}
                    </span>
                </div>
                <div>
                    <Popover
                        content={
                            <div style={{ width: 200 }}>
                                <div>你确定要删除该房间吗，确认后该房间将从列表中删除</div>
                                <div style={{ textAlign: 'right', marginTop: 20 }}>
                                    <Button type="primary" onClick={onDelete}>
                                        确定
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <CloseCircleOutlined />
                    </Popover>
                </div>
            </div>
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
