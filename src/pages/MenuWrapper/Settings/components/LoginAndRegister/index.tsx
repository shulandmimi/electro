import { useState } from 'react';
import { Modal, Input, Row, Col, message, Spin } from 'antd';

interface InputState {
    account: string;
    password: string;
}

interface LoginAndRegisterProps {
    title: string;
    onSubmit: (state: Partial<InputState>) => void;
    onCancel: () => void;
    visible: boolean;
    loading: boolean;
}

export default function LoginAndRegister(props: LoginAndRegisterProps) {
    const [account, setAccount] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <Modal onOk={() => props.onSubmit({ account, password })} onCancel={props.onCancel} visible={props.visible} title={props.title}>
            <Spin spinning={props.loading}>
                <Row align="middle">
                    <Col style={{ textAlign: 'right' }} span={4}>
                        <label htmlFor="">邮箱：</label>
                    </Col>
                    <Col span={20}>
                        <Input placeholder="请输入邮箱" style={{ width: '100%' }} value={account} onChange={(e) => setAccount(e.target.value)} />
                    </Col>
                </Row>
                <Row align="middle" style={{ marginTop: 10 }}>
                    <Col style={{ textAlign: 'right' }} span={4}>
                        <label htmlFor="">密码：</label>
                    </Col>
                    <Col span={20}>
                        <Input
                            placeholder="请输入密码(最低6位、包含最少一个数字和一个字母)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Row>
            </Spin>
        </Modal>
    );
}
