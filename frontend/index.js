// Check if service workers are supported
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js', {
      scope: '/',
    });
  }
