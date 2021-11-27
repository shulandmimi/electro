import {} from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { closeAbout } from '@/store/menu/SettingsModalVisible';

export default function About() {
    const dispatch = useDispatch();
    const aboutVisible = useSelector((state: RootState) => state.PositionSettingsModal.aboutVisible);

    return (
        <Modal onCancel={() => dispatch(closeAbout())} visible={aboutVisible} title="关于此">
            <h3>介绍</h3>
            <p>此项目使用React + Antd开发</p>
            <br />
            <h3>功能</h3>
            <ol>
                <li>查看指定房间电量</li>
                <li>接受邮件提醒（触发条件: 电量低于10）需要绑定邮件</li>
                <li>注册+登录（需要使用邮箱注册）</li>
            </ol>
            <br />
        </Modal>
    );
}
