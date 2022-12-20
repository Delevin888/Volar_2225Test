import { createApp } from 'vue'

import { createI18n } from 'vue-i18n'
import enUS from './assets/locales/en-US.json'
import zhCN from './assets/locales/zh-CN.json'

import App from './App.vue'
import router from './router'

// 引入Antd Design Vue样式
import('ant-design-vue/dist/antd.css')

// 引入全局样式
import('@/assets/styles/global.scss')
const app = createApp(App)

// 路由
app.use(router)

// 国际化
const i18n = createI18n({
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})
app.use(i18n)

// 挂载应用
app.mount('#app')
