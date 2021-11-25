import MenuWrapper from './MenuWrapper';
import ViewElectro from './ViewElectro/index';
import Settings from './MenuWrapper/Settings';

export default function IndexPage() {
    return (
        <>
            <Settings />
            <ViewElectro />
            <MenuWrapper />
        </>
    );
}
