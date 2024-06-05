import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { theme } from 'ant-design-vue/lib';
// import convertLegacyToken  from 'ant-design-vue/lib/theme/convertLegacyToken';
import { theme } from 'ant-design-vue';
import convertLegacyToken  from 'ant-design-vue/es/theme/convertLegacyToken';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v3Token = convertLegacyToken(mapToken);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: v3Token,
      }
    }
  }
})
