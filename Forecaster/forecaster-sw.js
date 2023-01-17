self.addEventListener("install", event => {
  event.waitUntill(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./forecaster.html",
                "./forecaster.css",
                "./image/logo_forecaster.png",
                "./js/forecaster-dataset.js",
                "./js/forecaster.js",
                "./js/dataList.csv",
                "./forcaster-pwa.js",
                "./forecaster-sw.js",
                "./mainfest.json",
                "https://cdn.jsdelivr.net/npm/chart.js",
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"

            ]);
        })
    );
});


self.addEventListener("fetch", event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);

      })
  );
});