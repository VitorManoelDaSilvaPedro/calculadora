import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
// O build é gerado em src/main/resources/static para ser servido pelo Spring Boot.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/main/frontend/js'),
    },
  },
  build: {
    outDir: 'src/main/resources/static',
    emptyOutDir: true,
  },
})
