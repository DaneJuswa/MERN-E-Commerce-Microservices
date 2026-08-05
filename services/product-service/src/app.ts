import express from "express"
import productsRoute from "./routes/productsRoute.js"
import categoriesRoute from "./routes/categoryRoute.js"
import brandRoute from "./routes/brandRoute.js"


const app = express()

app.use(express.json())
app.use("/api/products", productsRoute)
app.use("/api/categories", categoriesRoute)
app.use("/api/brands", brandRoute)

export default app;