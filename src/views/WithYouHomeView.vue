<script setup lang="ts">
import { salon } from '@/data/salon'
import { withYouCollection } from '@/data/brands'
import pochetteImg from '@/assets/ritual/pochette.webp'
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold-soft opacity-50 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <!-- Testo -->
        <div class="text-center md:text-left">
          <h2 class="mx-auto max-w-md font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl md:mx-0">
            Le cose più belle non si usano.<br />
            <span class="text-gold">Si portano con sé!</span>
          </h2>

          <p class="ritual-eyebrow mt-6 text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
            Una collezione firmata Iako Ritual
          </p>

          <!-- Il claim della pochette: EVERYWHERE / linea oro / with you.
               "inline-flex flex-col items-center": la larghezza del blocco
               è quella del testo più largo (di norma "EVERYWHERE"), e
               "with you" viene centrato sotto di esso automaticamente. -->
          <div class="mx-auto mt-6 inline-flex flex-col items-center md:mx-0">
            <div>
              <p class="ritual-claim text-3xl font-medium uppercase text-foreground sm:text-4xl">
                Everywhere
              </p>
              <!-- Riga dorata sotto "EVERYWHERE": tracciata pixel per pixel
                   dall'etichetta di riferimento. Non è simmetrica: sale
                   dolcemente fino a un plateau alto verso il centro-sinistra,
                   poi scende decisamente verso il basso a destra. -->
              <svg
                class="mt-0.5 w-full text-gold"
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
            <p class="ritual-script -mt-1 text-4xl text-foreground sm:text-5xl">with you</p>
          </div>

          <p class="mt-6 font-display text-xl font-bold text-gold">
            Collection N. {{ withYouCollection.number }}
          </p>
          <p class="ritual-wordmark text-lg text-muted">{{ withYouCollection.season }}</p>

          <div class="mx-auto mt-6 max-w-md space-y-4 text-left text-sm leading-relaxed text-muted md:mx-0">
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

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
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

        <!-- Immagine -->
        <div class="relative">
          <div class="overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-xl">
            <img
              :src="pochetteImg"
              alt="Pochette Everywhere With You — Collection N. 1, Summer 2026"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
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
