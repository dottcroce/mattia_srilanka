// Aggiorniamo il nome del cache per includere le nuove risorse (icona e suono click).
const CACHE_NAME = 'srilanka-app-v4';
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
  '/img/icon-192.png',
  '/img/icon-512.png',
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
