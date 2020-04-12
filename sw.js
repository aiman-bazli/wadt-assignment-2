var APP_PREFIX = 'WADT_Blog'     
var VERSION = 'version_01'
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [      
  '/',                      
  '/js/active.js',
  '/js/bootstrap.min.js',
  '/js/jquery-2.2.4.min.js',
  '/js/map-active.js',
  '/js/plugins.js',
  '/js/plugins.js',
  '/js/popper.js',
  '/css/animate.css',
  '/css/bootstrap.min.css',
  '/css/font-awesome.min.css',
  '/css/magnific-popup.css',
  '/css/owl.carousel.min.css',
  '/css/responsive.css',
  '/style.css',
  '/about.html',
  '/blog.html',
  '/index.html'
]

self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {      
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }
    })
  )
})


self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})


self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})