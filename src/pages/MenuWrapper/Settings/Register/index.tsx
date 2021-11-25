import { useState } from 'react';
import { Modal, Input, Row, Col, message, Spin } from 'antd';
import { useRequest } from 'ahooks';
import { useSelector, useDispatch } from 'react-redux';
import { registerAccountByMail } from '@/service/user';
import { RootState } from '@/store/index';
import { closeRegister } from '@/store/menu/SettingsModalVisible';
import { isMail, isPassword } from '@/tools/form/check';

export default function Register() {
    const [account, setAccount] = useState<string>();
    const [password, setPassword] = useState<string>();
    const disaptch = useDispatch();
    const registerVisible = useSelector((state: RootState) => state.PositionSettingsModal.registerVisible);

    const { loading, run: registerHandler } = useRequest(async () => {
        if (!(account && password)) {
            message.error('请输入帐号和密码');
            return;
        }
        if (!isMail(account)) {
            message.error('请输入正确的邮箱');
            return;
        }
        if (!isPassword(password)) {
            message.error('请输入正确的密码');
            return;
        }
        const { code, msg } = await registerAccountByMail(account, password);

        if (code != 200) {
            message.error(msg);
            return;
        }
        message.success('邮件已发送到邮箱中，请前往确认（邮件30分钟内有效）');
    });

    return (
        <Modal onOk={() => registerHandler()} onCancel={() => disaptch(closeRegister())} visible={registerVisible} title="注册">
            <Spin spinning={loading}>
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
