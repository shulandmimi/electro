import { Modal, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useMount } from 'ahooks';
import { RootState } from '@/store/index';
import { closeTutorial, showTutorial } from '@/store/menu/SettingsModalVisible';

export default function Tutorial() {
    const dispatch = useDispatch();
    const tutorialVisible = useSelector((state: RootState) => state.PositionSettingsModal.tutorialVisible);

    useMount(() => {
        dispatch(showTutorial());
    });

    return (
        <Modal onCancel={() => dispatch(closeTutorial())} visible={tutorialVisible} title="指南" footer={false}>
            <p>第一次进入页面会白屏，这是正常情况，因为还没有选择房间列表</p>
            <p>本弹框只显示一次，可以在右下角打开</p>
            <h2>菜单</h2>
            <p style={{ color: 'red' }}>
                右下角划入会显示热区，点击出现
                <Tag color="red" style={{ marginLeft: 10 }}>
                    扇形菜单icon
                </Tag>
            </p>
            <p>点击icon可以打开对应的弹框</p>
            <p>
                设置包含 <Tag>选择房间</Tag>、<Tag>注册</Tag>、<Tag>登录</Tag>、<Tag>关于</Tag>和<Tag>Github仓库</Tag>
            </p>

            <br />
            <h2>其他</h2>
            <ol>
                <li>
                    弹框都可以使用<Tag>ESC</Tag>或<Tag>点击蒙层</Tag>关闭
                </li>
            </ol>
        </Modal>
    );
}
