import { Express } from 'express';
import {post} from './controllers/SubscriptionController'

const initializeRoutes = (app: Express): void => {
    app.post('/subscription', post);
};

export default initializeRoutes;
