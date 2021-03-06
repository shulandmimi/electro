import { message } from 'antd';
import { useRequest } from 'ahooks';
import { useSelector, useDispatch } from 'react-redux';
import { registerAccountByMail } from '@/service/user';
import { RootState } from '@/store/index';
import { closeRegister } from '@/store/menu/SettingsModalVisible';
import { isMail, isPassword } from '@/tools/form/check';
import LoginAndRegister from '../components/LoginAndRegister';

export default function Register() {
    const disaptch = useDispatch();
    const registerVisible = useSelector((state: RootState) => state.PositionSettingsModal.registerVisible);

    const { loading, run: registerHandler } = useRequest(async (account, password) => {
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
        <LoginAndRegister
            title="注册"
            onCancel={() => disaptch(closeRegister())}
            loading={loading}
            visible={registerVisible}
            onSubmit={({ account, password }) => registerHandler(account, password)}
        />
    );
}
