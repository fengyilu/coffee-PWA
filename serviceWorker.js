const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/images/coffee1.jpg",
    "/images/coffee2.jpg",
    "/images/coffee3.jpg",
    "/images/coffee4.jpg",
    "/images/coffee5.jpg",
    "/images/coffee6.jpg",
    "/images/coffee7.jpg",
    "/images/coffee8.jpg",
    "/images/coffee9.jpg",
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