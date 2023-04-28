import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [react()],
    base: '/view/',
    server: {
      proxy: {
        '/api': {
          target: 'http://file.tounick.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
