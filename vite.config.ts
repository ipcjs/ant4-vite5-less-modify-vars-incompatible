import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 写法一: 导入CJS的文件, 执行pnpm dev, 报如下错误:
// failed to load config from /Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/vite.config.ts
// error when starting dev server:
// TypeError: convertLegacyToken is not a function
//     at file:///Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/vite.config.ts.timestamp-1717588125598-9da7f83ea09bf.mjs:10:15
//     at ModuleJob.run (node:internal/modules/esm/module_job:195:25)
//     at async ModuleLoader.import (node:internal/modules/esm/loader:337:24)
//     at async loadConfigFromBundledFile (file:///Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.2_less@4.2.0/node_modules/vite/dist/node/chunks/dep-BKbDVx1T.js:69911:21)
//     at async loadConfigFromFile (file:///Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.2_less@4.2.0/node_modules/vite/dist/node/chunks/dep-BKbDVx1T.js:69764:28)
//     at async resolveConfig (file:///Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.2_less@4.2.0/node_modules/vite/dist/node/chunks/dep-BKbDVx1T.js:69367:28)
//     at async _createServer (file:///Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.2_less@4.2.0/node_modules/vite/dist/node/chunks/dep-BKbDVx1T.js:65857:20)
//     at async CAC.<anonymous> (file:///Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.2_less@4.2.0/node_modules/vite/dist/node/cli.js:762:24)
// ELIFECYCLE Command failed with exit code 1.
// import { theme } from 'ant-design-vue/lib';
// import convertLegacyToken  from 'ant-design-vue/lib/theme/convertLegacyToken';

// 写法二: 导入ESM的文件, 执行pnpm dev, 报如下错误:
// (node:32763) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
// (Use `node --trace-warnings ...` to show where the warning was created)
// failed to load config from /Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/vite.config.ts
// error when starting dev server:
// /Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/node_modules/.pnpm/ant-design-vue@4.2.1_vue@3.4.27/node_modules/ant-design-vue/es/theme/convertLegacyToken.js:1
// import formatToken from './util/alias';
// ^^^^^^
// 
// SyntaxError: Cannot use import statement outside a module
//     at internalCompileFunction (node:internal/vm:76:18)
//     at wrapSafe (node:internal/modules/cjs/loader:1283:20)
//     at Module._compile (node:internal/modules/cjs/loader:1328:27)
//     at Module._extensions..js (node:internal/modules/cjs/loader:1422:10)
//     at Module.load (node:internal/modules/cjs/loader:1203:32)
//     at Module._load (node:internal/modules/cjs/loader:1019:12)
//     at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:203:29)
//     at ModuleJob.run (node:internal/modules/esm/module_job:195:25)
//     at async ModuleLoader.import (node:internal/modules/esm/loader:337:24)
//     at async loadConfigFromBundledFile (file:///Volumes/Data/github/@tg/@demos/ant-vite-compat-bug/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.2_less@4.2.0/node_modules/vite/dist/node/chunks/dep-BKbDVx1T.js:69911:21)
// ELIFECYCLE Command failed with exit code 1.
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
