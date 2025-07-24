import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const app = createApp(App)
const pinia = createPinia();
app.use(router) 


pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount('#app')
export { pinia }; 