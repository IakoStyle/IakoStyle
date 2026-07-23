<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { salon } from '@/data/salon'
import { withYouCollection } from '@/data/brands'
</script>

<template>
  <!-- HERO: banner fotografico con vignetta -->
  <section class="relative h-[26rem] w-full overflow-hidden sm:h-[24rem]">
    <video
      src="/everywhere/video.mp4"
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 h-full w-full object-cover"
    ></video>
    <!-- Scurimento uniforme -->
    <div class="absolute inset-0 bg-black/50"></div>
    <!-- Vignetta: bordi più scuri, centro più leggibile -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 100%)"
    ></div>
    <!-- Gradiente dal basso, per far risaltare il testo -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>

    <div class="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h2 class="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        Le cose più belle non si usano.<br />
        <span class="text-gold">Si portano con sé!</span>
      </h2>

      <p class="ritual-eyebrow mt-4 text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        Una collezione firmata Iako Ritual
      </p>
    </div>
  </section>

  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold-soft opacity-50 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <div class="text-center">
        <!-- Il claim della pochette: EVERYWHERE / linea oro / with you.
             "inline-flex flex-col items-center": la larghezza del blocco
             è quella del testo più largo (di norma "EVERYWHERE"), e
             "with you" viene centrato sotto di esso automaticamente. -->
        <div class="mx-auto mt-6 inline-flex flex-col items-center">
          <div class="relative">
            <p class="ritual-claim text-3xl font-medium uppercase text-foreground sm:text-4xl">
              Everywhere
            </p>
            <!-- Riga dorata sotto "EVERYWHERE": posizionata in assoluto
                 rispetto al testo, così resta sempre della sua stessa
                 larghezza esatta su ogni browser (anche mobile), invece
                 di rischiare di allungarsi oltre il testo. Non è
                 simmetrica: sale dolcemente fino a un plateau alto verso
                 il centro-sinistra, poi scende decisamente verso il
                 basso a destra. -->
            <svg
              class="absolute inset-x-0 top-full mt-0.5 text-gold"
              viewBox="0 0 300 10"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,5 C 40,1.5 100,0.5 150,0.5 C 200,0.5 260,3 300,10"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <p class="ritual-script mt-2 text-4xl text-foreground sm:text-5xl">with you</p>
        </div>

        <p class="mt-6 font-display text-xl font-bold text-gold">
          Collection N. {{ withYouCollection.number }}
        </p>
        <p class="ritual-wordmark text-lg text-muted">{{ withYouCollection.season }}</p>

        <div class="mx-auto mt-6 max-w-md space-y-4 text-center text-sm leading-relaxed text-muted">
          <p>
            Questa non è solo una pochette. È il simbolo del primo capitolo di
            <strong class="text-foreground">Everywhere with you</strong>.
          </p>
          <p>
            Un progetto nato per accompagnarti ovunque: in vacanza, al mare, in
            viaggio, nelle piccole abitudini di ogni giorno. Ogni estate nascerà
            una nuova edizione, con dettagli, colori e ispirazioni diverse.
            Conservala. Fra qualche anno racconterà dove tutto è iniziato.
          </p>
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            :href="`https://wa.me/39${salon.whatsappNumber}`"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" />
            Chiedici info
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Rimando alla pagina "La nostra storia" -->
  <section class="mx-auto max-w-2xl px-6 pb-16 text-center sm:pb-20">
    <p class="font-display text-xl italic text-muted">Ogni progetto ha una storia.</p>
    <RouterLink
      to="/with-you/storia"
      class="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-surface px-6 py-3 font-bold text-gold transition-colors hover:bg-gold-soft"
    >
      Scopri la nostra storia
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </RouterLink>
  </section>

  <!-- Dettagli materiali, come sull'etichetta -->
  <section class="mx-auto max-w-3xl px-6 pb-20">
    <div class="rounded-xl border border-border bg-surface p-8 text-center">
      <font-awesome-icon :icon="['fas', 'leaf']" class="text-2xl text-gold" />
      <p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
        Questo articolo è realizzato in cotone riciclato proveniente da fonti
        certificate. È privo di sostanze chimiche nocive. È rispettoso
        dell'ambiente e delicato sulla pelle.
        <br />
        Standard di cotone riciclato: GRS, RCS.
      </p>
      <p class="mt-4 text-xs text-muted">
        Designed by Iako Ritual · {{ salon.city }} · Prossima collezione — {{ withYouCollection.nextSeason }}
      </p>
    </div>
  </section>
</template>
