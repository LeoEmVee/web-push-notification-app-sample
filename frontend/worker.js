self.addEventListener('push', (ev) => {
    const data = ev.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        image: data.image,
        badge: data.badge,
        dir: data.dir,
        timestamp: data.timestamp,
        actions: data.actions,
        data: data.data,
        tag: data.tag,
        requireInteraction: data.requireInteraction,
        renotify: data.renotify,
        vibrate: data.vibrate,
        silent: data.silent
    });
});
