import './assets/main.css'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')