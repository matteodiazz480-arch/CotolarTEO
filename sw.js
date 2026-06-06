const CACHE_NAME = 'cotolar-v5';
const urlsToCache = [
    '/',
    '/index.html',
    '/pages/home/',
    '/pages/login/',
    '/pages/register/',
    '/pages/admin/',
    '/pages/teacher/',
    '/pages/institucional/',
    '/assets/js/db.js',
    '/assets/js/auth.js',
    '/assets/js/app.js',
    '/assets/js/admin.js',
    '/assets/js/chatbot.js',
    '/assets/js/chat.js',
    '/assets/js/data.js',
    '/assets/js/imageHandler.js',
    '/assets/js/institucional.js',
    '/assets/js/teacher.js',
    '/assets/css/styles.css',
    '/assets/css/admin.css',
    '/assets/css/teacher.css',
    '/assets/icons/icon.svg',
    '/assets/sounds/click.mp3',
    '/assets/sounds/error.mp3',
    '/assets/sounds/notification.mp3',
    '/assets/sounds/success.mp3',
    '/components/modal.js',
    '/components/modal.css',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
});