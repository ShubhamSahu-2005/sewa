import mongoose from 'mongoose';

let isConnected = false; // Tracking the connection state

console.log(process.env.MONGODB_URI);

export const connectToDB = async () => {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "SewaSacchi",
        });

        isConnected = true; // Update connection state
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};
