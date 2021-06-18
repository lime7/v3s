import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Bootstrap from 'bootstrap'

import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/scss/style.scss'

createApp(App).use(store).use(router).use(Bootstrap).mount('#app')
