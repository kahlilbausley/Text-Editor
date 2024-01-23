// Import the necessary Workbox modules
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route the assets during service worker installation
precacheAndRoute(self.__WB_MANIFEST);

// Define the caching strategy for pages (CacheFirst in this example)
const pageCacheStrategy = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache pages for 30 days
    }),
  ],
});

// Warm the cache for specific URLs (e.g., homepage and index.html)
pageCacheStrategy.handle({ request: { url: '/' } });
pageCacheStrategy.handle({ request: { url: '/index.html' } });

// Register the route for pages
registerRoute(
  // Example: Cache navigation requests (requests with mode 'navigate')
  ({ request }) => request.mode === 'navigate',
  pageCacheStrategy
);

// Define the caching strategy for assets (CacheFirst in this example)
const assetsCacheStrategy = new CacheFirst({
  cacheName: 'assets-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60, // Cache assets for 7 days
    }),
  ],
});

// Register the route for assets (customize the RegExp or matching logic)
registerRoute(
  // Example: Cache images with URLs ending in .jpg, .png, or .svg
  ({ request }) => request.destination === 'image',
  assetsCacheStrategy
);

// You can add more registerRoute calls for different types of assets or routes
// ...

// If you have a catch-all route for all requests, you might use something like:
// registerRoute(({ request }) => true, assetsCacheStrategy);
