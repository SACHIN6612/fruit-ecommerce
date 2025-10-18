// vite.config.js

<<<<<<< Updated upstream
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
>>>>>>> Stashed changes

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // यह Configuration सबसे ज़रूरी है:
  optimizeDeps: {
    // Vite को बताएं कि इन packages को build के दौरान Pre-bundle करें
    include: [
<<<<<<< Updated upstream
      'react-router-dom', 
      'react-router' // अगर आप सीधे 'react-router' का उपयोग कर रहे हैं
    ]
  }
})
=======
      "react-router-dom",
      "react-router", // अगर आप सीधे 'react-router' का उपयोग कर रहे हैं
    ],
  },
});
>>>>>>> Stashed changes
