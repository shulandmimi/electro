import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined, LoginOutlined } from '@ant-design/icons';
import Menu, { Item } from '@/components/Menu';
import { showPosition, showRegister } from '@/store/menu/SettingsModalVisible';
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
                { type: 'register', icon: <LoginOutlined onClick={() => dispatch(showRegister())} /> },
            ]}
            icon={{ width: 40, height: 40 }}
            margin={[5, 10]}
            radius={100}
        />
    );
}
