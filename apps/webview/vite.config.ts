
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import * as path from 'node:path'
//import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

dotenv.config()

// biome-ignore lint/style/noDefaultExport: implicit
export default defineConfig({
    base: './',
    server: {
        host: process.env.VITE_DEV_PATH || 'localhost',
        port: 5173,
    },
    build: {
        emptyOutDir: true,
        outDir: path.join(
            __dirname,
            '..',
            '..',
            'server',
            'client_packages',
            'cef'
        ),
        rollupOptions: {
            input: {
                main: 'index.html',
            },
        },
        chunkSizeWarningLimit: 10000, 
    },
    plugins: [
        react({
            babel: {
                plugins: [jotaiDebugLabel, jotaiReactRefresh],
            },
        }),
        svgr(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
})
