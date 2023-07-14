import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;
const vapidEmail = process.env.VAPID_EMAIL;

export default (): void => {
    webpush.setVapidDetails(
        vapidEmail,
        publicVapidKey,
        privateVapidKey
    );
    console.log('VAPID details setup done.');
};
