const CACHE_NAME = 'stasos-cinema-v1';
const FILES = ['./films.html','./index.html','./films.css','./films-extras.css','./films.js','./films-extras.js','./script.js','./enhancements.js','./style.css','./enhancements.css','./enhancements-pages.css','./cinema-icon.svg','./manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok && request.destination !== 'video' && request.destination !== 'audio') caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
    return response;
  }).catch(() => request.mode === 'navigate' ? caches.match('./films.html') : Response.error())));
});
