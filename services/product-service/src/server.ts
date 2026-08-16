import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/dbconfig.js";
import { connectProducer } from "./kafka/producer.js";

const PORT = process.env.PORT || 4001;

const startServer = async () => {
    try {
        await connectDB();
        await connectProducer();

        app.listen(PORT, () => {
            console.log(`Products Service Running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start Products Service:", error);
        process.exit(1);
    }
};

startServer();