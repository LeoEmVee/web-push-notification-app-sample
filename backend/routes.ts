import {Express} from 'express';
import {post, remove, broadcast} from './controllers/SubscriptionController'

const initializeRoutes = (app: Express): void => {
    app.post('/subscription', post);
    app.delete('/subscription', remove);
    app.get('/broadcast', broadcast);
    app.get('/favicon.ico', (req, res) => {
        res.status(200).send('Aquí no hay favicon de ese');
    });
};

export default initializeRoutes;
