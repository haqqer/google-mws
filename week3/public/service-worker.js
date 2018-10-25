var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/main.css',
    '/index.html',
    '/project1',
    '/project1/add2numbers.html',
    '/project1/add2numbers.js',
    '/project2',
    '/project2/index.html',
    '/project2/css',
    '/project2/css/mystyle.css',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[Service Worker] Activate');
});

self.addEventListener('fetch', function(event) {
    console.log('[ServiceWorker] Fetch ', event.request.url);
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
  