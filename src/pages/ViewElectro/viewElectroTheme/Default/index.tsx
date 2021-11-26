import { Card, Tag, Popover, Button, Row, Col } from 'antd';
import { Electro } from '@/service/electro';
import { useColor } from '@/hooks';
import { CloseCircleOutlined, MailOutlined, MailTwoTone } from '@ant-design/icons';
import { hasIn } from 'lodash';

interface ViewElectroItemProps {
    electro: number;
    id: number;
    createdAt: string;
    position: Electro['position'];
    onDelete: () => void;
    onSubscribe: () => void;
    onDeSubsribe: () => void;
}

export default function ViewElectroItem({ electro = 0, createdAt, position, onDelete, onDeSubsribe, onSubscribe }: ViewElectroItemProps) {
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
                <Row gutter={[10, 0]}>
                    <Col>
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
                    </Col>
                    {hasIn(position, 'mail') ? (
                        <Col>{position.mail ? <MailTwoTone onClick={onDeSubsribe} /> : <MailOutlined onClick={onSubscribe} />}</Col>
                    ) : null}
                </Row>
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
