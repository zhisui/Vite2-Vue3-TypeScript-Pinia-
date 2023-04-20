import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { transformLazyShow } from 'v-lazy-show'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    nodeTransforms: [
                        transformLazyShow, // <--- add this
                    ],
                },
            },
        }),
        visualizer(),
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://172.18.21.6:8088', //服务器地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/main.scss";',
            },
        },
    },
})
