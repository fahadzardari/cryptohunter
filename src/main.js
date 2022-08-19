import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import store from './store'


createApp(App)
.use(store)
.mount('#app')

