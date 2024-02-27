// let cacheData = "xjob-cache";
// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         "./static/js/main.chunk.js",
//         "./static/js/0.chunk.js",
//         "./static/js/bundle.js",
//         "/index.html",
//         "/favicon.ico",
//         "/manifest.json",
//         "/offline",
//       ]);
//     })
//   );
// });

// this.addEventListener("fetch", (event) => {
//   const request = event.request;

//   event.respondWith(
//     fetch(request)
//       .then((response) => {
//         return response;
//       })
//       .catch(async () => {
//         return caches.match(request).then((response) => {
//           if (response) {
//             console.log("cached");
//             return response;
//           } else {
//             console.log("offline");
//             return new Response('', {
//                 status: 301, // Redirect status code
//                 headers: {
//                   'Location': '/offline' // URL to redirect to
//                 }
//               })
//           }
//         });
//       })
//   );
// });
