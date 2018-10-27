var CACHE_NAME = 'haqqer-cache-v1';
var urlsToCache = [
    '/favicon.ico',
    '/main.css',
    '/index.html',
    '/images/console.png',
    '/images/profile.jpg',
    '/project1/add2numbers.html',
    '/project1/add2numbers.js',
    '/project2/index.html',
    '/project2/css/mystyle.css',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache) {
          console.log('[Service Woreker] Opened');
          return cache.addAll(urlsToCache);
      })
  );
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
  
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheNames) {
          return cacheNames != 'haqqer-cache-v1'
        }).map(function(cacheNames) {
          return caches.delete(cacheNames)
        })

      );
    })
  );
});
  