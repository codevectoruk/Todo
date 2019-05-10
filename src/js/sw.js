var CACHE = "2.1.3";

// On install, cache some resources.
self.addEventListener("install", function(evt) {
  //console.log("The service worker is being installed.");

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener("fetch", function(evt) {
  //console.log("The service worker is serving the asset.");
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function(cache) {
    return cache.addAll([
      "./index.html",
      "./manifest.json",
      "./robots.txt",
      "css/font-awesome.min.css",
      "css/main.css",
      "images/todo.png",
      "images/todo-icon.ico",
      "images/todo-icon256.png",
      "images/todo-logo256.png",
      "images/todo-logo512.png",
      "js/autosize.min.js",
      "js/highlight.min.js",
      "js/jquery-3.4.0.min.js",
      "js/main.js",
      "js/marked.min.js",
      "js/tail.datetime.min.js",
      "webfonts/fa-brands-400.woff",
      "webfonts/fa-brands-400.woff2",
      "webfonts/fa-regular-400.woff",
      "webfonts/fa-regular-400.woff2",
      "webfonts/fa-solid-900.woff",
      "webfonts/fa-solid-900.woff2",
      "fonts/OpenSans-Bold.ttf",
      "fonts/OpenSans-Italic.ttf",
      "fonts/OpenSans-Light.ttf",
      "fonts/OpenSans-Regular.ttf",
      "fonts/OpenSans-SemiBold.ttf"
    ]);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || Promise.reject("no-match");
    });
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function(cache) {
    return fetch(request).then(function(response) {
      return cache.put(request, response);
    });
  });
}
