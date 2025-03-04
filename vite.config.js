import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  base: '/', // Ensure this is set correctly
  build: {
    outDir: 'dist', // Ensure Vite builds to 'dist' (default)
  }
  
})
