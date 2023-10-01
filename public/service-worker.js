/* eslint-disable no-restricted-globals */

// Update version when there are changes
const CACHE_VERSION = 'v1.0';
const CACHE_NAME = 'dfm-cache';
const CACHE = `${CACHE_NAME}-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  '/index.html',
  '/favicon.ico',
  '/icons/32.png',
  '/icons/64.png',
  '/icons/128.png',
  '/icons/192.png',
  '/icons/256.png',
  '/icons/512.png',
];

self.addEventListener('install', async (event) => {
  console.log('Service worker installed');
  const cache = await caches.open(CACHE);
  try {
    await cache.addAll(FILES_TO_CACHE);
  } catch (error) {
    console.error('Error adding file to cache: ', error);
  }
});

self.addEventListener('activate', async (event) => {
  console.log('Service worker activated');
  const cacheNames = await caches.keys();
  const oldCaches = [];
  cacheNames.forEach((cache) => {
    if (cache !== CACHE) oldCaches.push(cache);
  });
  if (oldCaches.length > 0) {
    try {
      for (const oldCache of oldCaches) {
        await caches.delete(oldCache);
      }
    } catch (error) {
      console.error('Error deleting old cache: ', error);
    }
  }
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      if (event.request.method === 'GET') {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        try {
          const fetchResponse = await fetch(event.request);
          const cache = await caches.open(CACHE);
          await cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
    })()
  );
});
