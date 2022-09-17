import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router"
import AppLink from "@/components/AppLink.vue"


createApp(App).use(router).component("AppLink",AppLink)
.mount('#app')
