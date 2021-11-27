import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { SettingOutlined, PlusOutlined, LoginOutlined, GithubFilled, ExclamationCircleOutlined, PicCenterOutlined } from '@ant-design/icons';
import Menu, { Item } from '@/components/Menu';
import { showAbout, showLogin, showPosition, showRegister, showTutorialByForce } from '@/store/menu/SettingsModalVisible';
import { showMenu, hideMenu } from '@/store/menu';
import { RootState } from '@/store/index';

export default function MenuWrap() {
    const dispatch = useDispatch();
    const menu = useSelector((state: RootState) => state.Menu);

    const menuList = [
        { type: 'settings', icon: <SettingOutlined onClick={() => dispatch(showPosition())} />, title: '选择房间' },
        { type: 'register', icon: <PlusOutlined onClick={() => dispatch(showRegister())} />, title: '注册' },
        { type: 'login', icon: <LoginOutlined onClick={() => dispatch(showLogin())} />, title: '登录' },
        {
            type: 'github',
            title: 'Github',
            icon: (
                <a href="https://github.com/shulandmimi/electro" target="_blank">
                    <GithubFilled></GithubFilled>
                </a>
            ),
        },
        {
            title: '关于',
            type: 'about',
            icon: <ExclamationCircleOutlined onClick={() => dispatch(showAbout())} />,
        },
        {
            type: 'showTutorialByForce',
            title: '引导',
            icon: <PicCenterOutlined onClick={() => dispatch(showTutorialByForce())} />,
        },
    ];

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
            menus={menuList.map(({ title, ...item }) => {
                return { ...item, icon: <Tooltip title={title}>{item.icon}</Tooltip> };
            })}
            icon={{ width: 40, height: 40 }}
            margin={[5, 10]}
            radius={100}
        />
    );
}
