<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold-soft opacity-50 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-2xl px-6 pt-16 text-center sm:pt-20">
      <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        Everywhere With You
      </p>
      <h1 class="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
        La nostra storia
      </h1>
    </div>
  </section>

  <section class="mx-auto max-w-5xl px-6 pb-16 sm:pb-20">
    <div class="grid gap-10 md:grid-cols-2 md:items-start md:gap-12">
      <!-- Foto: l'altra pochette, affianco al racconto -->
      <div class="order-first overflow-hidden rounded-2xl border border-border shadow-xl md:order-last md:sticky md:top-24">
        <img
          src="/ritual/pochette2.jpeg"
          alt="Le pochette Everywhere With You e Iako Ritual sulla sabbia, tra conchiglie"
          class="aspect-square h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div>
        <div class="space-y-5 text-center font-display text-lg leading-relaxed text-foreground sm:text-xl">
          <p>Ogni progetto ha una storia.</p>
          <p>Questa inizia da una semplice parola.</p>
          <p class="text-2xl font-semibold text-gold sm:text-3xl">Everywhere.</p>
          <p>
            Per anni ha accompagnato uno dei capitoli più importanti della mia
            vita e, quando quel percorso si è concluso, ero convinto che anche
            quella parola dovesse rimanere lì.
          </p>
          <p class="italic text-muted">Intoccabile.</p>
          <p>Poi, con il tempo, ho capito una cosa.</p>
          <p>Le parole non appartengono ai luoghi.</p>
          <p>Non appartengono alle aziende.</p>
          <p>Appartengono alle persone che danno loro un significato.</p>
          <p>
            È stato in quel momento che Everywhere ha smesso di essere soltanto
            un ricordo.
          </p>
          <p class="font-semibold text-gold">È diventata una promessa.</p>
          <p>Perché il coraggio non è dimenticare ciò che siamo stati.</p>
          <p>
            È prendere il meglio del nostro passato e trasformarlo in qualcosa
            di nuovo.
          </p>
          <p class="pt-4 text-2xl font-semibold sm:text-3xl">
            Da qui nasce <span class="text-gold">Everywhere with you</span>.
          </p>
          <p>Non come uno slogan.</p>
          <p>Ma come una filosofia.</p>
          <p>
            Una filosofia che nasce in salone, ma continua a vivere ovunque
            venga portata.
          </p>
          <p class="pt-4 italic text-muted">Perché, in fondo…</p>
          <p>le cose più belle non si usano.</p>
          <p class="text-xl font-semibold text-gold sm:text-2xl">
            Si portano con sé.
          </p>
        </div>

        <div class="mt-12 flex justify-center">
          <RouterLink
            to="/with-you"
            class="flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-bold text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Torna a Everywhere With You
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
