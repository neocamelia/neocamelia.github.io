const CACHE_NAME = 'faoladh-cache-v2';
const OFFLINE_URL = 'offline.html';

const urlsToCache = [
  '/',
  '/styles.css',
  '/offline.css',
  '/scripts.js',
  '/offline.html',
  '/images/faoladh_zen_garden.png',
  '/images/faoladh_digging_tree.png',
  '/images/faoladh_stone_basin.png',
  '/images/faoladh_jumping_stream.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(function() {
          return caches.match(OFFLINE_URL);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  }
});
