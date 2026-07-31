
console.log("AUTH_SERVICE =", process.env.AUTH_SERVICE);
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import routes from "./routes/gatewayRoutes.js";
import { notFound } from "./middleware/notfound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();


//middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(helmet());

app.use(express.json())

app.use(cookieParser())

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
}))

//routes
app.use("/api", routes)


app.use(notFound)


app.use(errorHandler)


app.get("/health", (req: Request, res:Response) => {
    res.status(200).json({status: "ok"})
})

export default app


