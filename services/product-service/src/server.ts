import dotenv from "dotenv"
dotenv.config()

import app from "./app.js";
import connectDB from "./config/dbconfig.js";

const PORT = process.env.PORT || 4001
connectDB()

app.listen(PORT, () => {
    console.log("Produts Service Running")
})
