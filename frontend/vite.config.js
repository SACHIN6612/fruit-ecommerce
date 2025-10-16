// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // यह Configuration सबसे ज़रूरी है:
  optimizeDeps: {
    // Vite को बताएं कि इन packages को build के दौरान Pre-bundle करें
    include: [
      'react-router-dom', 
      'react-router' // अगर आप सीधे 'react-router' का उपयोग कर रहे हैं
    ]
  }
})
