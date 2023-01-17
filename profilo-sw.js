self.addEventListener("install", (event) => {
    event.waitUntill(
        caches.open("static").then(cache => {
            return cache.addAll(["./",
            "./html/about.html",
            "./html/contact.html",
            "./html/experience.html",
            "./html/home.html",
            "./html/qualification.html",
            "./html/skill.html",
            "./html/testimonial.html",
                "./css/style.css",
                "./css/animation.css",
                "./image/about.png",
                "./image/Basu.png",
                "./image/currency-converter.png",
                "./image/dhanya.png",
                "./image/forecaster.png",
                "./image/logo_svg.png",
                "./image/logo_192.png",
                "./image/logo_512.png",
                "./image/MG_uni_logo.png",
                "./image/paru.png",
                "./image/staffordshire_university_logo.jpg",                
                "./js/test.js",
                "./js/script.js",
                "./manifest.json",
                "./profilo-pwa.js",
                "./profilo-sw.js"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});