import mongoose from "mongoose";

export const connectDB = async() => {
    try {

        if (!process.env.MONGO_URL) {
            console.error("MONGO_URL is not defined in environment variables");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is connected Sucessfully!!!");

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected!");
        });
        
        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB reconnected!");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB error:", err);
        });

    } catch (error) {
        
        console.error("Error in Connecting Database -> ",error);
        process.exit(1);

    }
}