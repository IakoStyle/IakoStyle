# Iako Style — Sito web

Sito vetrina del salone **Iako Style** (Fondi, LT).
Stack: **Bun + Vue 3 + TypeScript + Tailwind CSS v4 + Font Awesome**. Mobile-first, tema chiaro/scuro.

## Avvio in locale

```bash
bun install      # installa le dipendenze
bun dev          # avvia il sito su http://localhost:5173
```

## Comandi utili

```bash
bun run build        # build di produzione (cartella dist/)
bun run preview      # anteprima della build
bun run type-check   # controllo dei tipi TypeScript
```

## Pagine

- **Home** — hero, servizi più richiesti, galleria, recensioni
- **Chi Siamo** — titolare, punti forti, team
- **Listino** — servizi e prezzi con filtri per categoria
- **Prodotti** — le marche usate (reparto uomo/donna)
- **Contatti** — mappa, orari, recapiti e social (tutto in una pagina)

## Come personalizzare

Tutto è centralizzato, così puoi modificare senza toccare la grafica:

| Cosa | File |
|------|------|
| Colori del tema (verdino/celestino) | `src/assets/main.css` → blocco `@theme` |
| Testi, prezzi, orari, team, prodotti, social | `src/data/salon.ts` |
| Foto e video della galleria | `src/data/media.ts` (istruzioni dentro il file) |

### Inserire foto e video
1. Copia i file in `src/assets/gallery/`
2. In `src/data/media.ts` sostituisci gli oggetti "placeholder" con quelli reali
   (esempi già scritti nei commenti del file).

## Da completare (segnaposto)
- Numero di telefono ed email reali → `src/data/salon.ts`
- Link social reali (Instagram, Facebook, TikTok, WhatsApp) → `src/data/salon.ts`
- Testo esteso "Chi Siamo" (storia/esperienza) → `src/views/AboutView.vue`
