import { message } from 'antd';
import { useRequest } from 'ahooks';
import { useSelector, useDispatch } from 'react-redux';
import { loginAccountByMail } from '@/service/user';
import { RootState } from '@/store/index';
import { closeLogin } from '@/store/menu/SettingsModalVisible';
import { isMail, isPassword } from '@/tools/form/check';
import LoginAndRegister from '../components/LoginAndRegister';

export default function Register() {
    const disaptch = useDispatch();
    const loginVisible = useSelector((state: RootState) => state.PositionSettingsModal.loginVisible);

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
        const { code, msg } = await loginAccountByMail(account, password);

        if (code != 200) {
            message.error(msg);
            return;
        }

        message.success('登录成功');
    });

    return (
        <LoginAndRegister
            title="登录"
            onCancel={() => disaptch(closeLogin())}
            loading={loading}
            visible={loginVisible}
            onSubmit={({ account, password }) => registerHandler(account, password)}
        />
    );
}
