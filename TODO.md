# TODO — Iako Style

Lista delle cose in sospeso, per non perderle tra una sessione e l'altra.

## 🔴 Bloccante — priorità assoluta

- [ ] **Dominio iakostyle.it**: comprarlo e collegarlo (registrar → Cloudflare DNS → Vercel).
      Finché non è fatto, tutti i tag SEO (canonical, sitemap, dati strutturati) puntano
      a un dominio che non esiste ancora — vedi la sezione "SEO" più sotto, dipende da questo.

## 🟡 In corso

- [ ] **Font "Brittany" per il claim di Ritual** ("with you" sulla pochette).
      È un font COMMERCIALE (Brittany Signature): non posso distribuirlo senza licenza.
      Attualmente sostituito con **Allura** (font libero, script simile).
      Opzioni: (1) Matteo ha già la licenza → serve il file .woff2/.otf e va verificato
      che copra l'uso "webfont"; (2) comprare la licenza web (~15-30€);
      (3) tenere Allura.

- [ ] **Foto per il carosello di Iako Ritual**: valutare una SECONDA
      cartella Google Drive dedicata, così Style e Ritual hanno
      caroselli separati (per ora Ritual mostra solo segnaposto "in arrivo").

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
- Sistema a due marchi: switch Style/Ritual nell'header, palette e font per marchio,
  rotta /ritual con il claim "Everywhere with you" nei font e colori ufficiali
- Pagina Prodotti separata per marchio: Style mostra solo Medavita Beta Refibre,
  Ritual mostra solo Nubea Sursum (rimossi Insight/Proraso/ghd/Goldwell/Redken)
- Pagina Listino per Ritual (Rituale Origine e Rituale Rinascita, spostati da
  Style dato che sono la collezione stagionale 'Summer Ritual 2026' di Ritual)
- Logo ufficiale di Iako Ritual (immagine reale al posto del testo ricostruito)
- Terzo marchio: 'Everywhere With You' (/with-you), la collezione di prodotti
  Iako Ritual (es. la pochette) — claim EVERYWHERE/with you + dettagli materiali
- Nuova landing page su '/' (schermata di scelta tra i 3 marchi, senza barra di
  navigazione), su indicazione di un bozzetto del cliente. La home di Style si
  è spostata su /style. IMPORTANTE: questo significa che chi arriva dai motori
  di ricerca o da Google Maps ora vede prima una schermata di scelta invece di
  atterrare dritto sulle informazioni del salone — un compromesso consapevole,
  segnalato e confermato esplicitamente dal cliente.
- Carosello reso riutilizzabile (props items + driveFolderId) invece di
  legato solo alle foto di Style; home di Ritual ora ha il proprio carosello
  (segnaposto per ora, in attesa di una cartella Drive dedicata)
- Fix: lo switch Style/Ritual nell'header non restava centrato quando i due
  marchi avevano un numero diverso di voci di menu
- Logo rigenerato dal PDF vettoriale (più nitido, trasparente, più leggero);
  favicon ricostruite dal logo vero
- Link diretto "scrivi una recensione" su Google Maps (Place ID corretto)
