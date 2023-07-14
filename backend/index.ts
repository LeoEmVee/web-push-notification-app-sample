import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import database from './config/database';
import initializeRoutes from './routes';
import webpush from './config/webpush';

dotenv.config();

const app = express();
const port = process.env.API_PORT;

// Serve all files in client
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(bodyParser.json());
// Database connection
console.log('Connecting to database...');
database();
// Routes initialization
console.log('Initializing routes...');
initializeRoutes(app);
// Set web push VAPID details
console.log('Setting up VAPID details...');
webpush();

// Start the Express server
console.log('Starting server...');
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
