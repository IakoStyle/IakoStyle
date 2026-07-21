import './assets/main.css'

// Font auto-ospitati (nessuna richiesta a Google Fonts): stesso identico
// aspetto grafico, ma senza inviare l'indirizzo IP di chi visita a
// server terzi prima ancora che dia un consenso — requisito privacy.
// Cormorant Garamond + Montserrat sono condivisi da Iako Style e Iako Ritual.
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/libre-baskerville/400.css'
import '@fontsource/libre-baskerville/700.css'
import '@fontsource/allura/400.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from './plugins/fontawesome'
import { initTheme } from './composables/useTheme'
import { applyBrandToDom, currentBrandFromPath } from './composables/useBrand'
import { loadAnalytics } from './composables/useAnalytics'

// Tema scuro ovunque, tranne nella home di scelta del mondo ("/"): si
// applica in base al percorso corrente prima del mount, così non c'è
// alcun flash del tema sbagliato al primo caricamento.
initTheme()

// Stessa logica per il marchio: la palette giusta (Style o Ritual) deve
// essere già applicata al primo pixel disegnato, altrimenti si vedrebbe
// un lampeggio di colori sbagliati aprendo direttamente una pagina /ritual.
applyBrandToDom(currentBrandFromPath(window.location.pathname))

// Il blocco/consenso è gestito da Iubenda (vedi index.html): qui lo
// script viene sempre inserito nella pagina.
loadAnalytics()

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
