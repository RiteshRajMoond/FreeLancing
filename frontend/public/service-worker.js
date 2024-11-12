const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Ffeatures.mp4?alt=media&token=cfff7eae-4e26-40b9-80fa-c9ad3c882a99",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fac.jpg?alt=media&token=da165a80-f00e-4ffe-ac34-e3cd9a236394",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Flogo.jpg?alt=media&token=2b86205e-c740-4519-b808-84fe233e7a0b",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Flogin.mp4?alt=media&token=15af14bb-569b-4150-a51e-d96f42ad0279",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fsignup.mp4?alt=media&token=c00fff8e-5864-4967-b3c6-93047fa87466",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg6.jpg?alt=media&token=0ca7dd55-a193-4c80-948f-4b5f2bf8cf9f)",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP1.jpg?alt=media&token=914efc65-e9b1-4ca1-b9ab-1d1bdb2ca564",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg5.jpg?alt=media&token=512cce5e-c5ff-4ed7-9a57-f84b5247e0b1",
  
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urlsToCache);
      } catch (error) {
        console.error("Failed to install the cache", error);
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(async () => {
    try {
      const resp = await caches.match(event.request);
      if (resp) return resp;

      const fetchresp = await fetch(event.request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, fetchresp.clone());
      return fetchresp;
    } catch (error) {
      console.error("Failed to fetch the cache", error);
    }
  });
});
