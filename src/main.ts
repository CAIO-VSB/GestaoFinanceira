import { createApp } from 'vue'
import App from './App.vue'
import {  Quasar } from "quasar"
import quasarLang from 'quasar/lang/pt-BR'
import 'quasar/src/css/index.sass'
import router from './router/router.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@quasar/extras/material-icons/material-icons.css';

const app = createApp(App)

app.use(Quasar, {
    plugins: {},
    lang: quasarLang
})

app.use(router)
app.mount('#app')
app.use(ElementPlus)


