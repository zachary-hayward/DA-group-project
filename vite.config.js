import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environmentOptions: {
      jsdom: { url: 'http://localhost:80' },
    },
    optimizer: {
      ssr: {
        include: ['three-stdlib'],
      },
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
