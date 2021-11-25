import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { closePosition } from '@/store/menu/SettingsModalVisible';
import Settings from './components/Settings';

export default function DialogSettings() {
    const dispatch = useDispatch();

    const settingsDialog = useSelector((state: RootState) => state.PositionSettingsModal);

    return (
        <Modal title="设置" visible={settingsDialog.positionVisible} footer={null} onCancel={() => dispatch(closePosition())}>
            <Settings />
        </Modal>
    );
}
