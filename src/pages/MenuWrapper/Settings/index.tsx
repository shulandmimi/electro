import PositionSettings from './PositionSetting';
import Register from './Register';
import Login from './Login';
import About from './About';

export default function Settings() {
    return (
        <>
            <PositionSettings></PositionSettings>
            <Register></Register>
            <Login />
            <About />
        </>
    );
}
