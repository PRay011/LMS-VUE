import { createApp } from 'vue'

import App from './App.vue'
import router from '../src/router/router.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(VueAxios, axios);
app.use(router)
app.mount('#app')

