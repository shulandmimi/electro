import { defineConfig } from 'umi';
import { InjectManifest } from 'workbox-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const manifestName = 'pwa-manifest.json';
const NODE_ENV = process.env.NODE_ENV as string;

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [{ path: '/', component: '@/pages/index' }],
    fastRefresh: {},
    publicPath: './',
    copy: [`./pwa/${manifestName}`, { from: './pwa/favicon', to: './favicon' }], // 这个需要提供 pwa 需要的 .webmanifest 文件，然后手动将其拷贝到构建之后的目录（dist）下
    links: [{ rel: 'manifest', href: `./${manifestName}` }], // 手动插入 .webmanifest 文件的 link
    chainWebpack: (memo) => {
        memo.plugin('workbox').use(InjectManifest, [
            {
                swSrc: `${process.cwd()}/pwa/service-worker`,
                swDest: './sw.js',
            },
        ]);
        memo.plugin('compression-webpack').use(CompressionPlugin, [
            {
                deleteOriginalAssets: false, // 是否删除压缩前的文件，看情况配置
                algorithm: 'gzip', // 压缩算法，默认就是gzip
                test: /\.js(\?.*)?$/i, // 根据情况配置，此处仅压缩.js
            },
        ]);
    },

    externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
    },
    scripts: [
        ...(NODE_ENV === 'development'
            ? ['https://unpkg.com/react@17/umd/react.development.js', 'https://unpkg.com/react-dom@17/umd/react-dom.development.js']
            : ['https://unpkg.com/react@17/umd/react.production.min.js', 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js']),
    ],

    webpack5: {},
});
