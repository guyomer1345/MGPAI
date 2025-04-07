// Service Worker for MGP.AI Fitness App

const CACHE_NAME = "mgp-ai-fitness-cache-v1"
const OFFLINE_URL = "/offline"

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/images/exercise-chat-icon.png",
]

// Install event - precache key resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache")
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // For HTML pages - network first, fallback to offline page
  if (event.request.headers.get("accept").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the latest version of the page
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || caches.match(OFFLINE_URL)
          })
        }),
    )
    return
  }

  // For other assets - cache first, network fallback
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      // Clone the request
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache the new resource
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // If both cache and network fail, we can't provide content
          if (
            event.request.url.includes(".png") ||
            event.request.url.includes(".jpg") ||
            event.request.url.includes(".jpeg") ||
            event.request.url.includes(".svg")
          ) {
            return new Response("", {
              status: 200,
              headers: { "Content-Type": "image/svg+xml" },
            })
          }
        })
    }),
  )
})

