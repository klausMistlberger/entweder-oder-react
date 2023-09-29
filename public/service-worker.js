/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'eox-cache';
const CACHE_VERSION = 'v1.0'; // Update version when there are changes

// Files to cache
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/icons/32.png',
  '/icons/64.png',
  '/icons/128.png',
  '/icons/256.png',
  '/icons/512.png',
]; // Add other URLs to cache for offline access

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then((cache) => {
      console.log('cached file loaded');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName.startsWith(CACHE_NAME) &&
            cacheName !== `${CACHE_NAME}-${CACHE_VERSION}`
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

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
