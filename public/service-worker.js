const CACHE_NAME = 'products-cache';
const CACHE_VERSION = 1;

const mockProducts = [
  {
    id: "1",
    name: 'Product A',
    manufacturer: { name: 'Manufacturer A', id: "101" },
    price: 29.99,
    expirationDate: new Date('2025-12-01'),
  },
  {
    id: "2",
    name: 'Product B',
    manufacturer: { name: 'Manufacturer B', id: "102" },
    price: 49.99,
    expirationDate: new Date('2024-11-15'),
  },
  {
    id: "3",
    name: 'Product C',
    manufacturer: { name: 'Manufacturer C', id: "103" },
    price: 19.99,
    expirationDate: new Date('2023-09-30'),
  },
  {
    id: "4",
    name: 'Product D',
    manufacturer: { name: 'Manufacturer D', id: "104" },
    price: 39.99,
    expirationDate: new Date('2025-01-20'),
  },
  {
    id: "5",
    name: 'Product E',
    manufacturer: { name: 'Manufacturer E', id: "105" },
    price: 24.99,
    expirationDate: new Date('2024-06-10'),
  },
];

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/products')) {
        event.respondWith(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(new Response(JSON.stringify(mockProducts), {
                        headers: { 'Content-Type': 'application/json' },
                    }));
                }, 1000); // added a small delay to simulate network latency
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
