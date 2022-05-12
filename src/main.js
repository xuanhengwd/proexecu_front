import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'
import router from './router'
const app=createApp(App).use(router).use(ElementPlus)

/*elementui 图标*/
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
app.mount('#app')