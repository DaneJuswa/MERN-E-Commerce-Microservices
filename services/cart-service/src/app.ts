import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cartRoutes from "./routes/cartRoutes.js"
import cors from "cors"

const app = express()


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/cart", cartRoutes)


export default app;


