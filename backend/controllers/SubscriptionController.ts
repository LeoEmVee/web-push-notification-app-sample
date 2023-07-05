import { NextFunction, Request, Response } from 'express';
import * as subscriptionRepository from '../repositories/SubscriptionRepository'

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subscription = req.body;
        const newSubscription = await subscriptionRepository.create(subscription);
        // Send 201 - resource created
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
            res.sendStatus(400);
            return;
        };
        const successful = await subscriptionRepository.deleteByEndpoint(endpoint);
        if (successful) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        };
    } catch (err) {
        console.error(err);
        next(err);
    };
};
