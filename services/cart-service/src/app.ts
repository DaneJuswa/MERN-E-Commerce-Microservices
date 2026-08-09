import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cartRoutes from "./routes/cartRoutes.js"


const app = express()


app.use(express.json())

app.use("/api/cart", cartRoutes)


export default app;


