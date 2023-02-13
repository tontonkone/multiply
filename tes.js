const STATIC_CACHE_NAME = 'site-static-v1';
const DINAMIC_CACHE = 'site-dinamic-v2'
const ASSETS = [
    '/',
    'index.html',
    'main.js',
    'style.css',
    '/img/content.gif',
    '/img/colore.gif',
    '/img/avatar-ia.png',
    '/img/avatar-user.png',
    'fall.html'
]

self.addEventListener('install', (ev) => {
    /*     console.log('service installé',ev)
     */

    ev.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('shell cached')
                cache.addAll(ASSETS)
            })
    )
})

self.addEventListener('activate', (ev) => {

    ev.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(keys
                .filter(key => key !== STATIC_CACHE_NAME && key !== DINAMIC_CACHE)
                .map(key => caches.delete(key)))

            console.log(keys);
        })
    )
    console.log('service active', ev)
})

self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(ev.request).then(resCache => {
            return resCache || fetch(ev.request).then(fetchRes => {
                return caches.open(DINAMIC_CACHE).then(cache => {
                    cache.put(ev.request.url, fetchRes.clone());
                    return fetchRes;
                })
            })
        }).catch(() => caches.match('/fall.html'))
    )
})


/* 
self.addEventListener('fetch', (e)=> {

    console.log(e.request.mode)
    if(e.request.mode === "navigate"){

        e.respondWith(
            (async () => {
                try{
                    //verifier si on a une reponse de type preload
                    const preloadReponse = await e.preloadReponse

                    // s'il y une reponse preload on laisse le navigateur fais son preload
                    if (preloadReponse) return preloadReponse;

                    // return la requête
                    return await fetch(e.request);
                }catch (er){
                    return new Response('salut')

                }
            })()
        )
    }
}) */