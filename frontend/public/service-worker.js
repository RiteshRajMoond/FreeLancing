const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Ffeatures.mp4?alt=media&token=cfff7eae-4e26-40b9-80fa-c9ad3c882a99",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fac.jpg?alt=media&token=da165a80-f00e-4ffe-ac34-e3cd9a236394",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Flogo.jpg?alt=media&token=2b86205e-c740-4519-b808-84fe233e7a0b",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Flogin.mp4?alt=media&token=15af14bb-569b-4150-a51e-d96f42ad0279",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fsignup.mp4?alt=media&token=c00fff8e-5864-4967-b3c6-93047fa87466",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg6.jpg?alt=media&token=0ca7dd55-a193-4c80-948f-4b5f2bf8cf9f",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP1.jpg?alt=media&token=914efc65-e9b1-4ca1-b9ab-1d1bdb2ca564",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP2.jpg?alt=media&token=7bd560df-72da-45ea-b021-20d0cab686ef",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP3.jpg?alt=media&token=c9790f49-3b46-4ed9-a69c-353ff70e567d",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP4.jpg?alt=media&token=2eab8f39-dd9b-485d-918d-d7b6f1956050",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP5.jpg?alt=media&token=36b36789-b4e6-4b12-8023-b4f88eabc044",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP6.jpg?alt=media&token=7012d39e-c906-48da-858f-2e8c07cdcdf0",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP7.jpg?alt=media&token=3668f834-a16c-4ac0-8af2-28cff4f8118a",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP8.jpg?alt=media&token=3da33601-93ed-40b7-961b-31641d1b387b",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP9.jpg?alt=media&token=be2342fd-252a-42eb-911b-5dc48096f50e",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP10.jpg?alt=media&token=dc7fda26-ad22-4ada-9e37-e6e9fc0833ba",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2FPP11.jpg?alt=media&token=04f27492-f310-491d-9ae9-110efa6030aa",
  "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg5.jpg?alt=media&token=512cce5e-c5ff-4ed7-9a57-f84b5247e0b1",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await Promise.all(
          urlsToCache.map(async (url) => {
            try {
              await cache.add(url);
            } catch (error) {
              console.error(`Failed to cache asset: ${url}`, error);
            }
          })
        );
      } catch (error) {
        console.error("Failed to install the cache", error);
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  // Bypass the service worker for API requests
  if (event.request.url.includes("/user/job/job-applicants") || event.request.url.includes("/user/job/select-applicant")) {
    return fetch(event.request);
  }

  event.respondWith(
    (async () => {
      try {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        console.error(`Fetch failed for: ${event.request.url}`, error);
        return new Response("Offline page not available", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }
    })()
  );
});