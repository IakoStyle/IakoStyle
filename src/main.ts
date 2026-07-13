import './assets/main.css'

// Font auto-ospitati (nessuna richiesta a Google Fonts): stesso identico
// aspetto grafico, ma senza inviare l'indirizzo IP di chi visita a
// server terzi prima ancora che dia un consenso — requisito privacy.
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/500-italic.css'
import '@fontsource/playfair-display/600-italic.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/400-italic.css'

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
