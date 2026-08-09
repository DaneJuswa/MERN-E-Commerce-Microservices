import "dotenv/config"
import mongoose from "mongoose"
import { Product } from "./models/Products.js"
import { Category } from "./models/Category.js"
import { Brand } from "./models/Brand.js"

async function main() {
    const uri = process.env.MONGO_URI
    if (!uri) throw new Error("MONGO_URI not set")

    await mongoose.connect(uri)
    console.log("connected")

    // 1. Create the missing Razer brand
    const razerBrand = await Brand.create({
        name: "razer",
        description: "Gaming peripherals and accessories",
    })
    console.log("Created brand:", razerBrand._id)

    // 2. Create proper categories (adjust names as you like)
    const shoesCategory = await Category.create({
        category: "Shoes",
        description: "Footwear for all occasions",
    })
    const electronicsCategory = await Category.create({
        category: "Electronics",
        description: "Gadgets and electronic accessories",
    })
    console.log("Created categories:", shoesCategory._id, electronicsCategory._id)

    // 3. Fix Nike Air Max 270 -> existing nike brand + new Shoes category
    await Product.findByIdAndUpdate("6a749f9120eb70140be7f8e2", {
        brand: "6a74976d7296e1a86676e3af", // existing "nike" brand
        category: shoesCategory._id,
    })

    // 4. Fix Razer DeathAdder V3 -> new razer brand + new Electronics category
    await Product.findByIdAndUpdate("6a74a3cbb69694d6bec41755", {
        brand: razerBrand._id,
        category: electronicsCategory._id,
    })

    console.log("Products fixed")

    // 5. Verify
    const fixed = await Product.find()
        .populate("category")
        .populate("brand")
        .lean()
    console.log(JSON.stringify(fixed, null, 2))

    await mongoose.disconnect()
}

main().catch((err) => {
    console.error("SCRIPT FAILED:", err)
    process.exit(1)
})