import mongoose, {ConnectOptions} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.WPNAPPSAMPLE_DB_URI;

export default async () => {
    // Connect to DB
    try {
        await mongoose.connect(uri/*, <ConnectOptions>{
            // This parameters are not necessary anymore in Mongoose newer version. I left them here for the sake of tutorial's competion
            useNewUrlParser: true,
            useUnifiedTopology: true
        }*/);
        console.log('Connected to database.');
    } catch (err) {
        console.error(`Couldn't connect to database: ${err}`);
        process.exit(1);
    }
}
