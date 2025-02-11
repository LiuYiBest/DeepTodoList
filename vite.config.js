import { fileURLToPath, URL } from 'node:url' // 将文件路径转换为 URL
import { defineConfig } from 'vite' // 定义配置，用于配置 Vite 构建过程
import vue from '@vitejs/plugin-vue' // 导入 Vue 插件，用于处理 Vue 组件
import tailwindcss from 'tailwindcss' // 导入 Tailwind CSS，用于生成 CSS 样式
import autoprefixer from 'autoprefixer' // 导入 Autoprefixer 用来添加浏览器前缀，使 CSS 在不同浏览器中兼容

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/DeepTodoList/' : '/',
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue(),
  ],
  server: {
    host: "0.0.0.0",
    port: "3000"
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  }
})
