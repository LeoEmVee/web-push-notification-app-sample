# Web push notification sample app

Small web app for subscribing to and sending a web push notification, built following the tutorial [How to Create Web Push Notifications - Full Tutorial](https://felixgerschau.com/web-push-notifications-tutorial/) by [fgerschau](https://github.com/fgerschau).

# To run locally

- You will need a publicVapidKey and a privateVapidKey. Check the tutorial to see how to generate them.
- I saved them in an environments.js file at the frontend (only the public one) and in the .env file at the backend (along with the vapidEmail, the API port, some image URLs and my MongoDB connection URI). You will need to provide all of them as well.

Then:

- `npm i`
- `npm run start`
- `http://localhost:[port]` (port of your choice, I saved mine in the .env file)
