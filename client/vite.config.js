import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' 
import tailwindcss from '@tailwindcss/vite'

// Get the directory of the current file (client/vite.config.js)
// Fix for Windows: remove leading slash from /C:/... to C:/...
const __dirname = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\\?\/([A-Za-z]:)/, '$1')
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src').replace(/\\/g, '/'),
      '@fullstack/common': path.resolve(__dirname, '../common/dist').replace(/\\/g, '/')
    },
  },
  server: {
    proxy: {
      // Proxy API requests starting with /api to the backend server
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
      },
    },
    // Add file system watch options for external directories
    fs: {
      // Allow Vite to access files from the common/dist directory.
      // This implicitly tells Vite to watch these paths for HMR.
      allow: [
        '..',
        path.resolve('../common'),
        path.resolve(__dirname, '.')
      ],
    },
  },
})
