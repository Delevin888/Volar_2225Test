import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/assets/styles/_variable.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    vueI18n({
      runtimeOnly: false,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/assets/locales/**')
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      dts: './src/@types/auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: '.env.extra/.eslintrc-auto-import.json',
        globalsPropValue: 'readonly'
      }
    }),
    Components({
      dts: 'src/@types/components.d.ts',
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView']
        }
      ],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 1024,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
          moment: ['moment'],
          vxe_table: ['vxe-table'],
          xe_utils: ['xe-utils'],
          sweetalert2: ['sweetalert2'],
          lunar_javascript: ['lunar-javascript']
        }
      }
    }
  }
})
