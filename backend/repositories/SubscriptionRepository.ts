import Subscription, {ISubscription} from '../models/SubscriptionModel'

export const create = async (subscription: ISubscription): Promise<ISubscription> => {
    const newSubscription = new Subscription(subscription);
    const savedSubscription = await newSubscription.save();
    return savedSubscription.toObject();
};

export const deleteByEndpoint = async (endpoint: string): Promise<boolean> => {
    const result = await Subscription.deleteOne({endpoint});
    return result.acknowledged && result.deletedCount > 0;
};
