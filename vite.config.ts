import { join } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePluginDoubleshot } from 'vite-plugin-doubleshot';
import VueRouter from 'unplugin-vue-router/vite';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/render'),
  plugins: [
    VueRouter({
      routesFolder: {
        src: 'src/render/pages'
      },
      dts: 'src/render/typed-router.d.ts'
    }),
    Icons({
      compiler: 'vue3'
    }),
    vue({}),
    VitePluginDoubleshot({
      type: 'electron',
      main: 'dist/main/index.js',
      entry: 'src/main/index.ts',
      outDir: 'dist/main',
      external: ['electron'],
      electron: {
        build: {
          config: './electron-builder.config.js'
        }
      }
    }),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ],
  resolve: {
    alias: {
      '@render': join(__dirname, 'src/render'),
      '@main': join(__dirname, 'src/main'),
      '@shared': join(__dirname, 'src/shared')
    }
  },
  base: './',
  build: {
    outDir: join(__dirname, 'dist/render'),
    emptyOutDir: true
  }
});
