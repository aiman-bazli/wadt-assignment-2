var APP_PREFIX = 'ApplicationName_'     
var VERSION = 'version_01'              
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            
  '/wadt-assignment-2/js/active.js',
  '/wadt-assignment-2/js/bootstrap.min.js',
  '/wadt-assignment-2/js/jquery-2.2.4.min.js',
  '/wadt-assignment-2/js/map-active.js',
  '/wadt-assignment-2/js/plugins.js',
  '/wadt-assignment-2/js/plugins.js',
  '/wadt-assignment-2/js/popper.js',
  '/wadt-assignment-2/css/animate.css',
  '/wadt-assignment-2/css/bootstrap.min.css',
  '/wadt-assignment-2/css/font-awesome.min.css',
  '/wadt-assignment-2/css/magnific-popup.css',
  '/wadt-assignment-2/css/owl.carousel.min.css',
  '/wadt-assignment-2/css/responsive.css',
  '/wadt-assignment-2/style.css',
  '/wadt-assignment-2/about.html',
  '/wadt-assignment-2/blog.html',
  '/wadt-assignment-2/index.html'
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
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