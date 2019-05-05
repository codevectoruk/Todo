var CACHE = "1.10.3";

// On install, cache some resource.
self.addEventListener("install", function(evt) {
  console.log("The service worker is being installed.");

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener("fetch", function(evt) {
  console.log("The service worker is serving the asset.");
  // Try network and if it fails, go for the cached copy.
  evt.respondWith(
    fromNetwork(evt.request, 400).catch(function() {
      return fromCache(evt.request);
    })
  );
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function(cache) {
    return cache.addAll([
      "./index.html",
      "./manifest.json",
      "./robots.txt",
      "./sw.js",
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
      "webfonts/fa-solid-900.woff2"
    ]);
  });
}

// Time limited network request. If the network fails or the response is not
// served before timeout, the promise is rejected.
function fromNetwork(request, timeout) {
  return new Promise(function(fulfill, reject) {
    // Reject in case of timeout.
    var timeoutId = setTimeout(reject, timeout);
    // Fulfill in case of success.
    fetch(request).then(function(response) {
      clearTimeout(timeoutId);
      fulfill(response);
      // Reject also if network fetch rejects.
    }, reject);
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

