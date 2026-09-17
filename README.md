# Officina delle Idee — sito web

Sito statico (solo HTML, CSS e JavaScript, nessun framework) per l'associazione
**Officina delle Idee**.

## Struttura del progetto

```
.
├── index.html          Homepage: presentazione, contenuti social, contatti
├── eventi.html         Elenco prossimi eventi live
├── iscrizione.html     Modulo di iscrizione (Netlify Forms)
├── grazie.html         Pagina di ringraziamento dopo l'invio del modulo
├── css/
│   └── style.css       Foglio di stile condiviso da tutte le pagine
├── js/
│   └── script.js       Menu mobile, anno nel footer
├── images/             Logo, favicon e immagini
└── assets_source/      Immagini originali fornite (non usate direttamente nel sito)
```

## Anteprima locale

Non serve installare nulla: è un sito statico. Basta un server locale qualsiasi
per evitare i limiti del protocollo `file://` (ad esempio con i moduli/form).

**Opzione 1 — Python (già presente su molti sistemi):**

```bash
cd "sito web officina delle idee"
python -m http.server 8000
```

Poi apri [http://localhost:8000](http://localhost:8000) nel browser.

**Opzione 2 — Node.js:**

```bash
npx serve .
```

**Opzione 3 — VS Code:**
installa l'estensione "Live Server" e clicca su "Go Live" con `index.html` aperto.

## Pubblicazione su Netlify

1. Crea un nuovo sito su [Netlify](https://www.netlify.com/) collegando questa cartella
   (o il repository Git in cui la carichi).
2. Nessuna build command è necessaria: è un sito statico puro. Imposta la
   *publish directory* sulla root del progetto.
3. Il modulo in `iscrizione.html` usa già gli attributi richiesti da Netlify
   Forms (`data-netlify="true"`, campo nascosto `form-name`, honeypot
   anti-spam). Dopo il primo deploy, Netlify rileverà automaticamente il form
   "iscrizione" nella sezione **Forms** della dashboard, da cui puoi anche
   impostare le notifiche email per ogni nuova iscrizione.
4. Dopo l'invio, l'utente viene reindirizzato a `grazie.html`.

## Contenuti da completare

Alcune parti sono volutamente segnaposto, in attesa di dati definitivi:

- **Contatti** (homepage, sezione "Contatti"): email, telefono e sede sono da
  aggiungere non appena disponibili.
- **Tipi di tessera** (pagina iscrizione): Junior 20€, Senior 50€, Partner 100€
  sono importi simbolici, da confermare a fine procedure notarili.
- **Eventi** (pagina eventi): i tre eventi mostrati sono di esempio, da
  sostituire con il calendario reale.
- **Testo di presentazione** (homepage, sezione "Chi siamo"): è una bozza,
  da rivedere liberamente.
- **Link social**: puntano a Instagram (`_officinadelleidee_`) e alla pagina
  LinkedIn dell'associazione — aggiorna l'URL LinkedIn se diverso da quello
  indicato in `index.html`, `iscrizione.html` ed `eventi.html`.

## Stile grafico

Palette e font sono ripresi dal logo e dai contenuti social già in uso:

- Blu navy `#0029a3`, nero/blu scurissimo di sfondo, oro/giallo `#f0c93a` come
  colore di accento.
- Titoli in **Anton** (font condensato bold), testi in **Poppins**, caricati
  da Google Fonts.
- Pattern a griglia sullo sfondo, coerente con la grafica dei post social
  dell'associazione.

Per modificare i colori, agisci sulle variabili CSS in cima a `css/style.css`
(sezione `:root`).
