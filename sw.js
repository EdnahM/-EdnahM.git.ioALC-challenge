const constCacheName='free_currency_converter';
const cacheFiles=['/','/index.html','/css/main.css','/scripts/index.js','/scripts/application.js','idb.js','/images/background.jpg','/images/Twitter.png','/images/facebook.png','/images/instragram.jpg']

self.addEventListener('install',(event) => {
   event.waitUntil(caches.open(fileCacheName)
   .then((cache) => cache.addAll (cacheFiles)) ) });
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.key()
    .then((cacheNames) => { 
      return Promise.all(cacheNames.filter((cacheName)=> {
      return cacheName.startWith('free_currency_converter')&& 
      cacheName!== fileCacheName;})
      .map(cacheName => caches.delete(cacheName)) 
   ); 
  })
 );
});
self.addEventListner('fetch', (event) => {
   event.respondWith(caches.match(event.request).then((response) =>{ if (response) { return response;}
    const fetchRequest = event.request.clone();
    return fetch(fetchRequest).then((response) => { if (!response || response.status !== 200 ||responce.type !== 'OK')
   {return response;}
   const responceToCache = response.clone();
   caches.open(cache_name).then((cache) => { cache.put(event.request, responseToCache); }); return response;}) 
  }) ) } );
self.addEventListener('message', (event) => { 
     if (event.data.action === 'goNext') {
     self.goNext();} });
