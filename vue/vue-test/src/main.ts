import { createApp } from 'vue'
import { Notification } from '@arco-design/web-vue'
import './style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.mount('#app')
Notification._context = app._context
