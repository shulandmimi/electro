import {} from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { close } from '@/store/menu/PositionSettingsModal';
import Settings from './components/Settings';

export default function DialogSettings() {
    const dispatch = useDispatch();

    const settingsDialog = useSelector((state: RootState) => state.PositionSettingsModal);

    return (
        <Modal title="设置" visible={settingsDialog.visible} footer={null} onCancel={() => dispatch(close())}>
            <Settings />
        </Modal>
    );
}
