import path from 'path'
import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

export default defineConfig(() => {
    // This is the configuration for the Vite build tool
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
});
