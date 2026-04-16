'use strict';

/** 
 *  Service Worker
 *  Caches all static assets on install so the app works offline.
 *  Update CACHE_VERSION when deploying new files.
 */
const CACHE_VERSION = 'v3';
const CACHE_NAME    = `easy-numbers-${CACHE_VERSION}`;

/**
 * All files to cache on install 
 */
const STATIC_ASSETS = [
  '/easy-numbers/',
  '/easy-numbers/index.html',
  '/easy-numbers/manifest.json',
  '/easy-numbers/assets/js/app.js',
  '/easy-numbers/assets/js/alpine.min.js',
  '/easy-numbers/assets/css/tailwind.min.css',
  '/easy-numbers/assets/icons/icon-192x192.png',
  '/easy-numbers/assets/icons/icon-512x512.png',
];

/**
 * Install: cache all static assets 
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/**
 * Activate: delete old caches 
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

/**
 * Fetch: serve from cache, fallback to network 
 */
self.addEventListener('fetch', event => {
  /* Only handle GET requests */
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached ?? fetch(event.request))
  );
});
