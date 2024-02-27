import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCryptocurrencyIcons from '@phantasweng/vue-cryptocurrency-icons'

import './style.css'
import App from './App.vue'

import 'material-icons/iconfont/material-icons.css';
import Antd from 'ant-design-vue'
const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)
app.use(Antd)
app.use(VueCryptocurrencyIcons)
app.use(createPinia())

app.mount('#app')
