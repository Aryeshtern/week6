import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () : Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

