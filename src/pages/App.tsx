import MenuWrapper from './MenuWrapper';
import ViewElectro from './ViewElectro/index';
import DialogSettings from './Setting';

export default function IndexPage() {
    return (
        <>
            <DialogSettings />
            <ViewElectro />
            <MenuWrapper />
        </>
    );
}
