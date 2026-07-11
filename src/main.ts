import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from './plugins/fontawesome'
import { useTheme } from './composables/useTheme'

// Applica il tema salvato PRIMA del mount, in modo esplicito e sincrono:
// evita sia il flash del tema sbagliato sia il disallineamento tra icona
// e colore effettivo del toggle (bug legato all'ordine di import dei moduli).
useTheme().initTheme()

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
