import Subscription, {ISubscription} from '../models/SubscriptionModel';
import {Document} from 'mongoose';

export const create = async (subscription: ISubscription): Promise<Document<ISubscription>> => {
    console.log('Saving subscription...');
    const newSubscription = new Subscription(subscription);
    const savedSubscription = await newSubscription.save();
    return savedSubscription;
};

export const deleteByEndpoint = async (endpoint: string): Promise<boolean> => {
    console.log('Removing subscription...');
    const url = new URL(endpoint);
    // Query encoding in order to match the way the endpoint property get's saved when the subscription is sent by MS Edge
    const encodedQuery = url.searchParams.toString()
        .replace(/\+/g, '%2b')
        .replace(/\//g, '%2f')
        .replace(/%\d[A-Z]/g, (match) => {
            const letter = match.charAt(match.length - 1).toLowerCase();
            return '%' + match.charAt(1) + letter;
    });
    const validatedEndpoint = encodedQuery ? `${url.origin}${url.pathname}?${encodedQuery}` : endpoint;
    const result = await Subscription.deleteOne({endpoint: validatedEndpoint});
    return result.acknowledged && result.deletedCount > 0;
};

export const getAll = async (): Promise<ISubscription[]> => {
    console.log('Getting subscriptions to send push notification...');
    const subscriptions = await Subscription.find();
    return subscriptions;
};
