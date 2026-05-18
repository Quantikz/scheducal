// Service Worker for Real Notifications
const CACHE_NAME = 'scheducal-v1';

self.addEventListener('install', (event) => {
    console.log('[SW] Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activated');
    event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'ScheduCal Reminder', body: 'You have an event!' };
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
            vibrate: [200, 100, 200],
            tag: data.tag || 'scheducal-reminder'
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, body, tag } = event.data;
        
        self.registration.showNotification(title, {
            body: body,
            icon: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
            badge: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
            vibrate: [200, 100, 200],
            tag: tag || 'scheducal-reminder',
            requireInteraction: true
        });
    }
});