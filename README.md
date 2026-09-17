# Officina delle Idee — sito web

Sito statico (solo HTML, CSS e JavaScript, nessun framework) per l'associazione
**Officina delle Idee**.

## Struttura del progetto

```
.
├── index.html          Homepage: presentazione, contenuti social, contatti
├── eventi.html         Elenco prossimi eventi live + modale di adesione
├── iscrizione.html     Modulo di iscrizione (Netlify Forms)
├── grazie.html         Pagina di ringraziamento dopo l'invio del modulo
├── privacy.html        Informativa sulla privacy
├── css/
│   └── style.css       Foglio di stile condiviso da tutte le pagine
├── js/
│   └── script.js       Menu mobile, anno nel footer, logica modale eventi
├── images/             Logo, favicon e immagini
├── locandine/          Locandine PDF/immagine scaricabili dalla modale eventi
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
3. I moduli in `iscrizione.html` (form "iscrizione") e nella modale di
   `eventi.html` (form "iscrizione-evento") usano già gli attributi richiesti
   da Netlify Forms (`data-netlify="true"`, campo nascosto `form-name`,
   honeypot anti-spam). Dopo il primo deploy, Netlify rileverà
   automaticamente entrambi i form nella sezione **Forms** della dashboard,
   da cui puoi anche impostare le notifiche email per ogni nuova iscrizione.
4. Dopo l'invio del modulo di iscrizione, l'utente viene reindirizzato a
   `grazie.html`. Il modulo di adesione a un evento invece viene inviato via
   AJAX (senza ricaricare la pagina): la modale stessa mostra il messaggio di
   conferma. Nota: il form Netlify AJAX funziona solo sul sito pubblicato,
   non in anteprima locale.

## Come aggiungere un nuovo evento

La pagina `eventi.html` e lo script `js/script.js` sono già pronti per
qualsiasi numero di eventi: per aggiungerne uno nuovo basta copiare una
scheda evento esistente (blocco `<article class="event-card">...</article>`
dentro `.events-list`) e modificare solo i contenuti, senza toccare il
JavaScript. In particolare, sulla scheda:

- `data-event-title="..."` — il titolo dell'evento (deve corrispondere al
  testo dentro `<h3>`): viene mostrato in cima alla modale e inviato come
  campo "evento" nelle adesioni ricevute su Netlify.
- `data-locandina="locandine/nome-file.pdf"` — il percorso del file della
  locandina che l'utente scarica dopo aver inviato l'adesione. Usa un nome
  file diverso e riconoscibile per ogni evento (es. minuscolo, con trattini,
  senza spazi né accenti).
- Il resto dei campi (`.day`, `.month`, orario, luogo, descrizione) sono solo
  testo da aggiornare liberamente.

Poi carica il file della locandina nella cartella `locandine/` con **esattamente**
lo stesso nome indicato in `data-locandina`. Se il file non c'è ancora, la
pagina continua a funzionare: il link "Scarica la locandina" punta comunque
al percorso previsto, e basterà aggiungere il file in seguito senza modificare
il codice.

## Contenuti da completare

Alcune parti sono volutamente segnaposto, in attesa di dati definitivi:

- **Contatti** (homepage, sezione "Contatti"): email, telefono e sede sono da
  aggiungere non appena disponibili.
- **Tipi di tessera** (pagina iscrizione): Junior 20€, Senior 50€, Partner 100€
  sono importi simbolici, da confermare a fine procedure notarili.
- **Eventi** (pagina eventi): i tre eventi mostrati sono di esempio, da
  sostituire con il calendario reale (vedi sezione "Come aggiungere un nuovo
  evento" sopra). Le locandine PDF vanno caricate in `locandine/`.
- **Privacy** (`privacy.html`): i dati del titolare (ragione sociale, sede,
  codice fiscale, email ed email di contatto, durata di conservazione) sono
  segnaposto tra `[...]`, da completare con i dati reali dell'associazione.
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
