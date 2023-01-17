self.addEventListener("install", e => {
    e.waitUntill(
        caches.open("static").then(cache => {
            return cache.addAll(["./",
                "./currency-converter.html",
                "./currency-converter.css",
                "./image/logo.png",
                "manifest.json",
                "currency-converter-sw.js",
                "currency-converter-pwa.js"
            ]);
        })
    );
});
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);

        })
    );
});