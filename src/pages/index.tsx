import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { UseRequestProvider } from 'ahooks';
import { store } from '@/store';
import App from './App';
import './index.scss';

if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js');
    });
}

export default function IndexPage() {
    return (
        <UseRequestProvider value={{ manual: true }}>
            <Provider store={store}>
                <ConfigProvider locale={zhCN}>
                    <App />
                </ConfigProvider>
            </Provider>
        </UseRequestProvider>
    );
}
