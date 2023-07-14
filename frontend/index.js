import {environment} from './environments.js';

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js', {
        scope: '/',
    });
    console.log('Service worker registered');
};

const publicVapidKey = environment.publicVapidKey;

// Copied from the web-push documentation
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    };
    return outputArray;
};

const getSubscribedElement = () => document.getElementById('subscribed');
const getUnsubscribedElement = () => document.getElementById('unsubscribed');

const setSubscribeMessage = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    getSubscribedElement().setAttribute('style', `display: ${subscription ? 'block' : 'none'};`);
    getUnsubscribedElement().setAttribute('style', `display: ${subscription ? 'none' : 'block'};`);
    console.log('Subscription buttons updated.');
};

window.subscribe = async () => {
    if (!('serviceWorker' in navigator)) return;
    const registration = await navigator.serviceWorker.ready;
    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    const response = await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('Subscription successfully saved.');
        setSubscribeMessage();
    }
};

window.unsubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return;
    const {endpoint} = subscription;
    const response = await fetch(`/subscription?endpoint=${endpoint}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    });
    if (response.ok) {
        await subscription.unsubscribe();
        setSubscribeMessage();
        console.log('Subscription successfully deleted.');
    };
};

window.broadcast = async () => {
    await fetch('/broadcast', {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push notification sent.');
};

setSubscribeMessage();
