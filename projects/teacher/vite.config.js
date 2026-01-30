import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        federation({
            name: 'teacher',
            filename: 'remoteEntry.js',
            exposes: {
                './Component': './src/main.tsx',
            },
            shared: []
        })
    ],
    server: {
        port: 4202,
        strictPort: true,
        cors: true
    },
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false
    },
    resolve: {
        alias: {
            '@shared': resolve(__dirname, '../../shared'),
        },
    },
})
