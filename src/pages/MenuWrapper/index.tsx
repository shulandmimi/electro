import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined, PlusOutlined, LoginOutlined, GithubFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import Menu, { Item } from '@/components/Menu';
import { showAbout, showLogin, showPosition, showRegister } from '@/store/menu/SettingsModalVisible';
import { showMenu, hideMenu } from '@/store/menu';
import { RootState } from '@/store/index';

export default function MenuWrap() {
    const dispatch = useDispatch();
    const menu = useSelector((state: RootState) => state.Menu);
    return (
        <Menu
            visible={menu.visible}
            onClose={() => {
                dispatch(hideMenu());
            }}
            onClick={() => {
                if (!menu.visible) dispatch(showMenu());
                else dispatch(hideMenu());
            }}
            renderMenuItem={({ payload: { type, icon }, position }) => (
                <Item key={type} x={position.x} y={position.y} style={{ textAlign: 'center', lineHeight: '40px' }}>
                    {icon}
                </Item>
            )}
            menus={[
                { type: 'settings', icon: <SettingOutlined onClick={() => dispatch(showPosition())} /> },
                { type: 'register', icon: <PlusOutlined onClick={() => dispatch(showRegister())} /> },
                { type: 'login', icon: <LoginOutlined onClick={() => dispatch(showLogin())} /> },
                {
                    type: 'github',
                    icon: (
                        <a href="https://github.com/shulandmimi/electro" target="_blank">
                            <GithubFilled></GithubFilled>
                        </a>
                    ),
                },
                {
                    type: 'about',
                    icon: <ExclamationCircleOutlined onClick={() => dispatch(showAbout())} />,
                },
            ]}
            icon={{ width: 40, height: 40 }}
            margin={[5, 10]}
            radius={100}
        />
    );
}
