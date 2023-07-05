import mongoose, {ConnectOptions} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.WPNAPPSAMPLE_DB_URI;

export default async () => {
    // Connect to DB
    try {
        await mongoose.connect(uri, <ConnectOptions>{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(`Couldn't connect to database: ${err}`);
        process.exit(1);
    }
}
