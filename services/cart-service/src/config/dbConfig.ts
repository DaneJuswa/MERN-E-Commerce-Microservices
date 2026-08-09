import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("Cart database successfully connected")
    } catch (error) {
        
    }
}