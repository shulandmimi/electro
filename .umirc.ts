import { defineConfig } from 'umi';
import { InjectManifest } from 'workbox-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import path from 'path';

const manifestName = 'pwa-manifest.json';
const NODE_ENV = process.env.NODE_ENV as string;
console.log(NODE_ENV);
export default defineConfig({
    title: 'electro',
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [{ path: '/', component: '@/pages/index' }],
    fastRefresh: {},
    publicPath: './',
    copy: [`./pwa/${manifestName}`, { from: './pwa/favicon', to: './favicon' }], // 这个需要提供 pwa 需要的 .webmanifest 文件，然后手动将其拷贝到构建之后的目录（dist）下
    links: [{ rel: 'manifest', href: `./${manifestName}` }], // 手动插入 .webmanifest 文件的 link
    hash: true,
    chunks: ['app'],
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

    plugins: [path.join(__dirname, './src/plugins/renameUmi.ts')],

    externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
        '@reduxjs/toolkit': 'window.RTK',
    },
    scripts: [
        ...(NODE_ENV === 'development'
            ? [
                  'https://unpkg.com/react@17/umd/react.development.js',
                  'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
                  'https://unpkg.com/@reduxjs/toolkit@1.6.2/dist/redux-toolkit.umd.js',
              ]
            : [
                  'https://unpkg.com/react@17/umd/react.production.min.js',
                  'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
                  'https://unpkg.com/@reduxjs/toolkit@1.6.2/dist/redux-toolkit.umd.min.js',
              ]
        ).map((item) => ({ src: item, crossorigin: 'crossorigin' })),
    ],

    webpack5: {},
});
