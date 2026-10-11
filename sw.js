// Kill switch for the service worker of the previous PWA. Browsers that still have it installed fetch this
// file on their next visit; it clears every cache, unregisters itself and reloads open tabs onto the new site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) await caches.delete(key);
  await self.registration.unregister();
  for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
})()));
