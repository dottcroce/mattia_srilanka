// Aggiorniamo il nome del cache per forzare la ricarica dei file quando viene
// distribuita una nuova versione della webapp. Cambiando il numero di
// versione, i file precedentemente memorizzati nel vecchio cache verranno
// ignorati e sovrascritti con le nuove risorse.
// Aggiorniamo il nome della cache per forzare il browser a scaricare
// nuovamente tutte le risorse modificate. Incrementando la versione
// evitiamo che il service worker serva copie obsolete dei file.
// Aggiorniamo il nome della cache per includere le nuove risorse (icona e suono click).
// Aggiorniamo il nome della cache per assicurare che le versioni precedenti
// siano invalidate e le modifiche ai file JavaScript/HTML (inclusi i nuovi
// beep con il file MP3) vengano scaricate nuovamente dal browser.
// Aggiorniamo ulteriormente il nome del cache per includere il nuovo
// riferimento all'icona "banner.png" nel manifest. Questo forzerà il
// browser a scaricare di nuovo le risorse e ad utilizzare la nuova icona
// al posto di quella precedente installata sul dispositivo.
const CACHE_NAME = 'srilanka-app-v7';
// Elenco dei file da memorizzare in cache. Oltre alle pagine principali
// includiamo anche tutte le pagine delle località, così da poterle
// visualizzare offline. Se in futuro verranno aggiunte nuove località,
// sarà sufficiente aggiungere il relativo percorso in questo array.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // Utilizziamo direttamente banner.png come icona principale. Anche se
  // manteniamo le vecchie icon-192 e icon-512 nel progetto, per la PWA
  // l'icona viene ora recuperata da banner.png tramite manifest.json.
  '/img/banner.png',
  '/img/logo.png',
  '/img/splash-screen.png',
  '/img/mappa_fumetto.jpg',
  // Pagine delle località
  '/localita/negombo.html',
  '/localita/udawalawe.html',
  '/localita/ella.html',
  '/localita/kandy.html',
  '/localita/pasikuda.html',
  '/localita/trincomalee.html',
  '/audio/click.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME)
        .map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
