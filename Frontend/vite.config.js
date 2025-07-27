import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      {
        name: 'copy-redirects',
        writeBundle() {
          const redirectsPath = resolve('public/_redirects')
          const distRedirectsPath = resolve('dist/_redirects')
          if (existsSync(redirectsPath)) {
            copyFileSync(redirectsPath, distRedirectsPath)
            console.log('_redirects file copied to dist/')
          }
        }
      }
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      historyApiFallback: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
      },
      copyPublicDir: true,
    },
    preview: {
      port: 3000,
      host: true,
      historyApiFallback: true,
    },
    envDir: './',
    envPrefix: 'VITE_',
  }
})