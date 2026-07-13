<script setup lang="ts">
import { salon } from '@/data/salon'
import { useCookieConsent } from '@/composables/useCookieConsent'
import BlobDecor from '@/components/BlobDecor.vue'

const { reset } = useCookieConsent()
</script>

<template>
  <section class="relative overflow-hidden">
    <BlobDecor />
    <div class="mx-auto max-w-3xl px-6 py-16 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-bold text-primary">
        <font-awesome-icon :icon="['fas', 'circle-check']" />
        Privacy
      </span>
      <h1 class="mt-5 font-display text-4xl font-bold text-foreground sm:text-5xl">
        Privacy <span class="text-primary">Policy</span>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-muted">
        Come trattiamo i dati di chi visita questo sito, in parole semplici.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-3xl space-y-8 px-6 pb-16 text-foreground">
    <div class="rounded-xl border border-border bg-surface p-6">
      <h2 class="font-display text-xl font-bold text-foreground">Titolare del trattamento</h2>
      <p class="mt-3 text-muted">
        {{ salon.name }} di {{ salon.owner }} — {{ salon.address }}.
        Per qualsiasi richiesta relativa a questa informativa puoi scrivere su
        WhatsApp al numero {{ salon.whatsappDisplay }}.
      </p>
    </div>

    <div class="rounded-xl border border-border bg-surface p-6">
      <h2 class="font-display text-xl font-bold text-foreground">Dati raccolti</h2>
      <p class="mt-3 text-muted">
        Questo sito non ha moduli di contatto o account utente: non raccogliamo né
        conserviamo dati personali di chi naviga, salvo quanto descritto qui sotto
        a proposito di cookie e servizi di terze parti. Le prenotazioni avvengono
        interamente su Treatwell, che ha una propria informativa privacy separata.
      </p>
    </div>

    <div class="rounded-xl border border-border bg-surface p-6">
      <h2 class="font-display text-xl font-bold text-foreground">Cookie tecnici (sempre attivi)</h2>
      <p class="mt-3 text-muted">
        Usiamo la memoria locale del browser (localStorage), non cookie in senso
        stretto, per ricordare due sole informazioni: se preferisci il tema chiaro
        o scuro del sito, e la scelta che farai riguardo ai cookie opzionali
        descritti sotto. Sono strettamente necessari al funzionamento del sito e
        non richiedono consenso.
      </p>
    </div>

    <div class="rounded-xl border border-border bg-surface p-6">
      <h2 class="font-display text-xl font-bold text-foreground">Cookie e servizi opzionali (solo con il tuo consenso)</h2>
      <ul class="mt-3 space-y-3 text-muted">
        <li class="flex gap-2">
          <font-awesome-icon :icon="['fas', 'map-location-dot']" class="mt-1 shrink-0 text-primary" />
          <span>
            <strong class="text-foreground">Mappa Google Maps</strong> nella pagina Contatti:
            se scegli di caricarla, Google riceve l'indirizzo IP del tuo dispositivo
            secondo la
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="font-bold text-primary hover:underline">privacy policy di Google</a>.
          </span>
        </li>
        <li class="flex gap-2">
          <font-awesome-icon :icon="['fas', 'circle-check']" class="mt-1 shrink-0 text-primary" />
          <span>
            <strong class="text-foreground">Statistiche anonime</strong> (Google Analytics), se attive:
            servono solo a capire in aggregato quante persone visitano il sito e quali
            pagine guardano di più — mai per identificare singoli visitatori.
          </span>
        </li>
      </ul>
      <button
        class="mt-5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
        @click="reset"
      >
        Cambia le tue preferenze sui cookie
      </button>
    </div>

    <div class="rounded-xl border border-border bg-surface p-6">
      <h2 class="font-display text-xl font-bold text-foreground">Servizi di terze parti sempre attivi</h2>
      <p class="mt-3 text-muted">
        Alcuni elementi del sito richiedono di contattare server esterni per
        funzionare, indipendentemente dalla scelta sui cookie, perché sono parte
        integrante del contenuto stesso (non tracciamento):
      </p>
      <ul class="mt-3 space-y-2 text-muted">
        <li>
          <strong class="text-foreground">Google Drive</strong> — la galleria fotografica del salone legge
          le immagini da una cartella pubblica; non viene inviato alcun dato personale
          di chi visita il sito.
        </li>
        <li>
          <strong class="text-foreground">Link a Treatwell, Instagram, Facebook e WhatsApp</strong> — cliccando
          questi link esci dal nostro sito verso piattaforme di terzi, ciascuna con la
          propria informativa privacy.
        </li>
      </ul>
      <p class="mt-3 text-sm text-muted">
        I caratteri tipografici del sito sono invece ospitati direttamente da questo
        dominio, non da Google Fonts: nessun dato viene condiviso con terzi solo per
        visualizzare il testo.
      </p>
    </div>

    <div class="rounded-xl border border-border bg-surface p-6">
      <h2 class="font-display text-xl font-bold text-foreground">I tuoi diritti</h2>
      <p class="mt-3 text-muted">
        In base al Regolamento UE 2016/679 (GDPR) hai diritto di accedere, rettificare
        o richiedere la cancellazione di eventuali dati che ti riguardano, e di opporti
        al loro trattamento. Per esercitare questi diritti, o per qualsiasi domanda su
        questa informativa, contattaci su WhatsApp al numero {{ salon.whatsappDisplay }}.
      </p>
    </div>

    <p class="text-center text-xs text-muted">Ultimo aggiornamento: luglio 2026</p>
  </section>
</template>
