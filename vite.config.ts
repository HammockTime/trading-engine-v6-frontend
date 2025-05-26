import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mockHooksPlugin from './vite-plugin-mock-hooks'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mockHooksPlugin( ),
    react()
  ],
  base: './',
  build: {
    sourcemap: true,
    minify: true,
  },
  define: {
    // Inject global mocks
    'window.useAuth': 'window.useAuth || (() => ({}))',
    'window.useApi': 'window.useApi || (() => ({}))',
  }
})
