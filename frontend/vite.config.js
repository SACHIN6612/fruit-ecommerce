import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ⚙️ optional: if deploying to subfolder (e.g. GitHub Pages)
  base: '/',

  server: {
    port: 5173,              // default port
    open: true,              // auto open browser
    proxy: {
      // 🧠 optional: connect frontend to backend API
      '/api': {
        target: 'http://localhost:5000', // your Node.js backend
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
  },
})
