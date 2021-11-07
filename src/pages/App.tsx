import { useDispatch } from 'react-redux';
import MenuWrapper from './MenuWrapper';
import ViewElectro from './ViewElectro/index';
import DialogSettings from './Setting';

export default function IndexPage() {
    const dispatch = useDispatch();

    return (
        <>
            <DialogSettings />
            <ViewElectro />
            <MenuWrapper />
        </>
    );
}
