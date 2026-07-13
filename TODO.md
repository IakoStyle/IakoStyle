# TODO — Iako Style

Lista delle cose in sospeso, per non perderle tra una sessione e l'altra.

## 🔴 Bloccante — priorità assoluta

- [ ] **Dominio iakostyle.it**: comprarlo e collegarlo (registrar → Cloudflare DNS → Vercel).
      Finché non è fatto, tutti i tag SEO (canonical, sitemap, dati strutturati) puntano
      a un dominio che non esiste ancora — vedi la sezione "SEO" più sotto, dipende da questo.

## 🟡 In corso

- [ ] **Link diretto "scrivi una recensione" su Google Maps.**
      Il link attuale (`salon.googleMapsReviewUrl`) porta solo alla scheda del locale,
      non apre direttamente il modulo di recensione.
      Serve il **Place ID** ufficiale (formato `ChIJ...`, diverso dal CID numerico già
      provato e non funzionante). Va recuperato con lo strumento ufficiale Google:
      https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
      (cerca "Iako Style Fondi", clicca sul marker, copia il "Place ID").
      Una volta ottenuto: costruire `https://search.google.com/local/writereview?placeid=ID`
      e TESTARLO su più dispositivi prima di sostituirlo sul sito.

- [ ] **Widget di prenotazione Treatwell incorporato nel sito** (invece del semplice link
      che porta fuori dal sito). Serve il codice del "Widget" dal pannello
      Treatwell Connect del salone (Impostazioni → Prenotazione online → Widget).
      Con quello, selezionare un servizio sul sito potrebbe portare dritto al
      calendario di prenotazione già aperto (via link diretto o iframe incorporato),
      senza dover ricercare il servizio di nuovo su Treatwell.

## 🟢 Da valutare (non urgenti)

- [ ] **Google Search Console**: collegare il sito e sottomettere la sitemap
      (dopo aver risolto il dominio .it — va fatto con l'URL definitivo).
- [ ] **Feed Instagram live** in home. Due strade possibili, nessuna gratis-e-senza-manutenzione:
      API ufficiale Meta (gratis, ma token da rinnovare periodicamente) oppure un
      widget di terzi tipo Elfsight/SnapWidget (comodo, a pagamento).
- [ ] **Sezione FAQ** (es. "si accettano clienti senza appuntamento?", "come si paga?",
      "c'è parcheggio?").
- [ ] **Pagina "Prima & Dopo" dedicata**, galleria di trasformazioni — potrebbe pescare
      dalla stessa cartella Google Drive già collegata al carosello.
- [ ] **Testo esteso pagina Chi Siamo** (esperienza del salone, storia) — Matteo aveva
      detto "te lo dirò più avanti". Aiuterebbe anche la SEO (più contenuto testuale).
- [ ] **Backlink locali**: farsi inserire su directory/elenchi locali di Fondi e Latina,
      per rafforzare la SEO locale.

## ✅ Fatto (per riferimento)

- Sito completo (Home, Chi Siamo, Listino, Prodotti, Contatti) — Vue 3 + TypeScript + Tailwind
- Deploy su Vercel, repo su GitHub (org IakoStyle), dominio provvisorio iako-style.vercel.app
- Galleria foto automatica da Google Drive (il cliente carica, il sito si aggiorna da solo)
- Listino prezzi completo e reale da Treatwell, con accordion per prezzi variabili
- Conformità privacy: banner cookie, Privacy Policy, font auto-ospitati, mappa dietro consenso
- Google Analytics attivo dietro consenso
- SEO: meta dinamici per pagina, dati strutturati, sitemap, robots.txt, favicon completa
- Ottimizzazione immagini: tutte convertite in WebP, compressione automatica in build
- Carosello: loop infinito fluido, swipe touch (iOS e Android) e drag da mouse
- Partita IVA nel footer e nella Privacy Policy
- Due pulsanti recensioni in home: Google Maps e Treatwell
