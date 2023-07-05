import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import database from './config/database';

dotenv.config();

const app = express();
const port = process.env.API_PORT;

// Serve all files in client
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(bodyParser.json());
// Database connection
database();

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
