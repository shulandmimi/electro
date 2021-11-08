import { defineConfig } from 'umi';
import { InjectManifest } from 'workbox-webpack-plugin';

const manifestName = 'pwa-manifest.json';

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
    },
});
