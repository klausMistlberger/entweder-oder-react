/* eslint-disable no-restricted-globals */

// Update version when there are changes
const CACHE_VERSION = 'v1.0';
const CACHE_NAME = 'eox-cache';
const CACHE = `${CACHE_NAME}-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  '/',
  '/favicon.ico',
  '/icons/32.png',
  '/icons/64.png',
  '/icons/128.png',
  '/icons/192.png',
  '/icons/256.png',
  '/icons/512.png',
];

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const oldCaches = [];
      cacheNames.forEach((cache) => {
        if (cache !== CACHE) oldCaches.push(cache);
      });
      caches.delete(oldCaches);
    })
  );
});

// self.addEventListener('fetch', (event) => {
//   console.log(event);
//   return;
// });

// Fetch event
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          return caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
