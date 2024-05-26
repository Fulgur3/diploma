import './assets/main.css'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
App.use(router)
