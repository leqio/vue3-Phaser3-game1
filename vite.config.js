import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import {fileURLToPath, URL} from 'node:url'
import {resolve} from 'path'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    // 添加别名
    alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url))
    '@': resolve(__dirname,'src')
    }
  },
  server: {
    port: 8080, // 本地开发服务器端口
    open: true, // 是否自动在浏览器中打开
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'https://cdn.phaserfiles.com/v385', // 代理目标 API 地址
        changeOrigin: true, // 开启代理，允许跨域
        rewrite: path => path.replace(/^\/api/, '') // 重写路径，将 /api 前缀替换为空
      }
    }
  },
  build: {
    outDir: 'dist',            // 输出目录
    assetsDir: 'assets',        // 静态资源目录
    rollupOptions: {
        output: {
            entryFileNames: 'main.js',  // 主文件名
            format: 'cjs',              // 微信小游戏不支持 ES 模块
        },
    },
    assetsInlineLimit: 0
  },
  base: process.env.NODE_ENV === 'production' ? '/boom_star' : ''
})
