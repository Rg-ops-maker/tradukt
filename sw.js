const CACHE = 'tradukt-v2';
const ASSETS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.hostname.includes('openfoodfacts.org') || url.hostname.includes('openbeautyfacts.org') || url.hostname.includes('deepl.com') || url.hostname.includes('mymemory')) return;
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
