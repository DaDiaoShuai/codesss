self.addEventListener("install", (e) => {
  e.waitUtil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["./7.event.html", "./8.jsonp.js"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(function (res) {
      if (res) {
        return res;
      }
      console.log("fetch source");
    })
  );
});
