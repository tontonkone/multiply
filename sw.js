const BASE = location.protocol + "//" +  location.host;
const PREFIX = "V7";
const FILE_CACHED = [
    "fail.html",
    `${BASE}/style.css`
]


//installation
self.addEventListener("install", (ev) => {

    self.skipWaiting();
    ev.waitUntil(
        (async () => {
            const cache = await caches.open(PREFIX);
            return cache.addAll(FILE_CACHED)
        })()
    )
});

//activation 
self.addEventListener("activate", (ev) => {

    clients.claim();
    ev.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map((key) => {
                    if (!key.includes(PREFIX)) {
                        return caches.delete(key)
                    }
                })
            )
        })()

    )

    console.log('activer' + PREFIX);
})


self.addEventListener('fetch', (ev) => {

    if (ev.request.mode === "navigate") {

        ev.respondWith(
            (async () => {
                try {
                    //verifier si on a une reponse de type preload
                    const preloadResponse = await ev.preloadResponse

                    // s'il y une reponse preload on laisse le navigateur fais son preload
                    if (preloadResponse) return preloadResponse;

                    // return la requête
                    return await fetch(ev.request);
                } catch (e) {
                    const cache = await caches.open(PREFIX)
                    return await cache.match("/fall.html")

                }
            })()
        )
    }
})