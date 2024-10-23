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
  }
})
