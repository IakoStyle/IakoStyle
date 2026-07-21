<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- HERO: banner fotografico con vignetta -->
  <section class="relative h-[26rem] w-full overflow-hidden sm:h-[24rem]">
    <img
      src="/everywhere/pochette1.png"
      alt="Pochette Everywhere With You — La nostra storia"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <!-- Scurimento uniforme -->
    <div class="absolute inset-0 bg-black/50"></div>
    <!-- Vignetta: bordi più scuri, centro più leggibile -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 100%)"
    ></div>
    <!-- Gradiente dal basso, per far risaltare il testo -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>

    <div class="relative mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        Everywhere With You
      </p>
      <h1 class="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
        La nostra storia
      </h1>
    </div>
  </section>

  <section class="mx-auto max-w-2xl px-6 pb-16 sm:pb-20">
    <div class="space-y-5 pt-10 text-center font-display text-lg leading-relaxed text-foreground sm:text-xl">
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
        È prendere il meglio del nostro passato e trasformarlo in qualcosa di
        nuovo.
      </p>
      <p class="pt-4 text-2xl font-semibold sm:text-3xl">
        Da qui nasce <span class="text-gold">Everywhere with you</span>.
      </p>
      <p>Non come uno slogan.</p>
      <p>Ma come una filosofia.</p>
      <p>
        Una filosofia che nasce in salone, ma continua a vivere ovunque venga
        portata.
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
  </section>
</template>
