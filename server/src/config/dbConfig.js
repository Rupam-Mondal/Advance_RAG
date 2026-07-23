import mongoose from 'mongoose';

export async function connectDB(){
    try {
        const response = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database is connected");
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}