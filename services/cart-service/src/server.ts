import dotenv from "dotenv"
dotenv.config()

import { connectDB } from "./config/dbConfig.js";
import app from "./app.js";

import { connectConsumer } from "./kafka/consumer.js";
const PORT = process.env.PORT || 4004

async function startServer() {
    try {
        //await db
        connectDB()
        await connectConsumer();
        app.listen(PORT, () => {
            console.log(`CART-SERVICE running on PORT ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Crash early if the DB connection fails
    }
}

startServer()



