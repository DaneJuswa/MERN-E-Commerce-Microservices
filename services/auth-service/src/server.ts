import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import authRoute from "./routes/authRoutes.js"



const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())


connectDB();


app.use("/api/auth", authRoute)


app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

app.listen(4000, () => {
    console.log("auth server runnning on port 4000")
})