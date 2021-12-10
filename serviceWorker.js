const staticDevCoffee = "dev-coffee-site-v2"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

const latest = {
    cache: 'some-cache-name/v1'
  };
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(latest.cache).then(cache => {
        return cache.addAll([
          '/'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    // exclude requests that start with chrome-extension://
    if (event.request.url.startsWith('chrome-extension://')) return;
    event.respondWith(
      caches.open(latest.cache).then(cache => {
        return cache.match(event.request).then(response => {
          var fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          return response || fetchPromise;
        })
      })
    );
  });

  // Activate service worker
self.addEventListener('activate', function(event) {
  console.log("Service Worker activate")
  event.waitUntil(
      caches.keys().then(function(cacheNames) {
          return Promise.all(
              cacheNames.filter(function(cacheName) {
                  // Return true if you want to remove this cache,
                  // but remember that caches are shared across
                  // the whole origin
              }).map(function(cacheName) {
                  return caches.delete(cacheName);
              })
          );
      })
  );
});