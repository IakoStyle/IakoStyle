# Foto dello studio — caricamento automatico da Cloudinary

Il carosello dello studio (home e pagina "Chi siamo") mostra **automaticamente
tutte le foto** presenti su Cloudinary con il tag `iako-studio`.

> In pratica: **carichi una foto su Cloudinary → compare da sola sul sito.**
> Niente modifiche al codice, niente nuovo deploy.

Se Cloudinary non è configurato (o è irraggiungibile), il sito usa le foto
locali di riserva in `public/studio/`.

---

## Configurazione iniziale (una volta sola)

1. **Crea un account gratuito** su [cloudinary.com](https://cloudinary.com).

2. **Abilita la "Resource list".** Serve perché il sito possa leggere l'elenco
   delle foto.
   - Vai su **Settings → Security**.
   - Nella sezione *Restricted media types*, **togli la spunta** a
     **`Resource list`**. Salva.

3. **Crea un "Upload preset" che tagga in automatico.** Così ogni foto che
   carichi riceve il tag giusto senza doverlo fare a mano.
   - Vai su **Settings → Upload → Upload presets → Add upload preset**.
   - *Signing Mode*: **Unsigned** (più comodo).
   - Nel preset imposta:
     - **Folder**: `iako-style/studio`
     - **Tags**: `iako-studio`
   - Salva e annota il nome del preset.

4. **Collega il Cloud name al sito.**
   - In alto nella dashboard Cloudinary trovi il **Cloud name**.
   - In locale: copia `.env.example` in `.env` e imposta:
     ```
     VITE_CLOUDINARY_CLOUD_NAME=iltuocloudname
     ```
   - In produzione: imposta la stessa variabile `VITE_CLOUDINARY_CLOUD_NAME`
     nelle variabili d'ambiente del tuo hosting e rifai il deploy **una volta**.

---

## Aggiungere foto (uso quotidiano)

1. Apri la **Media Library** di Cloudinary.
2. Trascina le nuove foto usando l'**upload preset** creato sopra
   (cartella `iako-style/studio`, tag `iako-studio`).
3. Fatto. Compaiono nel carosello entro pochi minuti (l'elenco è messo in
   cache da Cloudinary per qualche minuto).

Per **togliere** una foto dal sito: eliminala da Cloudinary, oppure rimuovi il
tag `iako-studio`.

---

## Dettagli tecnici

- Le foto sono servite con `f_auto,q_auto`: Cloudinary sceglie da solo il
  formato migliore (WebP/AVIF) e la qualità ottimale.
- L'ordine nel carosello segue l'elenco restituito da Cloudinary.
- Il codice coinvolto:
  - `src/data/media.ts` → `fetchStudioGallery()` scarica l'elenco.
  - `src/composables/useStudioGallery.ts` → gestisce fallback e cache.
  - `src/components/MediaCarousel.vue` → usa la galleria reattiva.
