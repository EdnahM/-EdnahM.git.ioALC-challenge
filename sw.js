const cacheName='free_currency_converter';
const urlApi = [  'https://free.currencyconverterapi.com/api/v5/currencies'];
const cacheFiles=['/','/index.html','/css/main.css','/scripts/index.js','/scripts/application.js','idb.js','/images/background.jpg','/images/Twitter.png','/images/facebook.png','/images/instragram.jpg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      try {
        return cache.addAll(cachableFiles.concat(urlApi))
      }catch (e) {
        return 'Could not Access Server';
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then( (keys) => {
        return Promise.all(keys.map((key, i) => {
          if(key !== cachNameVersion){
            return caches.delete(keys[i]);
          }
      }))
    })  
  )
});

self.addEventListener('fetch', (event) => {
  let url = event.request.clone();
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {

    event.respondWith(
      fetch(event.request).catch(error => {
        console.log('Oops, You are offline, Currently');
        return caches.match('index.html');
      })
    );
    
  }else{
    event.respondWith(
      caches.match(event.request)
      .then((res) => {
        if(res){
          return res;
        }
        return fetch(url).then((res) => {        
          if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
          }
          let response = res.clone();
          caches.open(cacheName)
          .then((cache) => {
            cache.put(event.request, response);
          });
          return res;
        }).catch ((error)=> {
          return error;        
        })
      })
    )
  }
});


