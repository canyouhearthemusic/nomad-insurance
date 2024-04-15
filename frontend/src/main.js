import { createApp, markRaw } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
import './axios'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(pinia)
app.use(router)
app.mount('#app')