import { NextFunction, Request, Response } from 'express';
import * as subscriptionRepository from '../repositories/SubscriptionRepository'
import webpush, {SendResult} from 'web-push';

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subscription = req.body;
        const newSubscription = await subscriptionRepository.create(subscription);
        // Send 201 - resource created
        console.log('User suscription created...');
        res.status(201).json(newSubscription);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const endpoint: string = req.query.endpoint?.toString();
        if (!endpoint) {
            console.log('Endpoint not found');
            res.sendStatus(400);
            return;
        };
        const successful = await subscriptionRepository.deleteByEndpoint(endpoint);
        if (successful) {
            console.log('Endpoint deleted');
            res.sendStatus(200);
        } else {
            console.log('Something has gone wrong with the deletion');
            res.sendStatus(500);
        };
    } catch (err) {
        console.error(err);
        next(err);
    };
};

export const broadcast = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notification = {
            title: 'Web push notification sample',
            body: 'Hi there 😎, I am an experimental web push notification, full of a lot of nonsensical text just for you to check how long a notification can be in order to be able to get our users read what we need them to read without missing anything, so I have to keep writing until I get a big amount of characters, yuhu!',
            icon: process.env.WPN_SAMPLE_IMAGE_1,
            image: process.env.WPN_SAMPLE_IMAGE_1,
            badge: process.env.WPN_SAMPLE_IMAGE_1,
            dir: 'auto',
            timestamp: new Date().getTime(),
            actions: [
                {action: 'open', title: 'Open notification', icon: process.env.WPN_SAMPLE_IMAGE_2},
                {action: 'close', title: 'Close notification', icon: process.env.WPN_SAMPLE_IMAGE_2},
                {action: 'gotoweb', title: 'Go to web', icon: process.env.WPN_SAMPLE_IMAGE_2}
            ],
            data: {
                name: 'I could be anything',
                anything: 35
            },
            tag: 'Test push',
            requireInteraction: true,
            renotify: true,
            vibrate: [300, 100, 300],
            silent: false
        };
        const subscriptions = await subscriptionRepository.getAll();
        const notifications: Promise<SendResult>[] = [];
        subscriptions.forEach((subscription) => {
            notifications.push(
                webpush.sendNotification(subscription, JSON.stringify(notification))
            );
        });
        await Promise.all(notifications);
        console.log('Push notification sent from the backend.');
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        next(err);
    };
};
