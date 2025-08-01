import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, path.join(process.cwd(), '../../'), '')

    if (env.VITE_MODE === 'dev') {
        return {
            build: {
                target: 'esnext',
                minify: false,
                outDir: path.join('../../', 'server', 'client_packages', 'cef'),
                emptyOutDir: true,
                rollupOptions: {
                    external: [path.join('./src', 'assets', '*')],
                },
            },
            plugins: [react()],
            css: {
                postcss: {
                    plugins: [autoprefixer()],
                },
            },
            resolve: {
                alias: [
                    {
                        find: '@',
                        replacement: path.resolve(__dirname, './src/'),
                    },
                    {
                        find: /^\$\/assets\/clothes\/.*\/[^\/]*$/,
                        replacement: path.resolve(
                            __dirname,
                            './src/assets/clothes/custom/female/1/0-0.png',
                        ),
                    },
                ],
            },
        }
    } else if (env.VITE_MODE === 'production') {
        return {
            build: {
                target: 'esnext',
                minify: false,
                outDir: path.join('../../', 'server', 'client_packages', 'cef'),
                emptyOutDir: true,
            },
            plugins: [react()],
            css: {
                postcss: {
                    plugins: [autoprefixer()],
                },
            },
            resolve: {
                alias: [
                    {
                        find: '@',
                        replacement: path.resolve(__dirname, './src/'),
                    },
                    {
                        find: '$',
                        replacement: path.resolve(__dirname, './src/'),
                    },
                ]
            },
        }
    } else {
        return {
            build: {
                target: 'esnext',
                rollupOptions: {
                    external: ['rage-rpc', 'rpc'],
                },
            },
            plugins: [react()],
            css: {
                postcss: {
                    plugins: [autoprefixer()],
                },
            },
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src/'),
                },
            },
        }
    }
})
