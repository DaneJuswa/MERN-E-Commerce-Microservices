import type { CreateProductPayload } from "../schemas/productSchema.js"
import { Product } from "../models/Products.js"

export const getProducts = async () => {
    try {
        const products = await Product.find()
        .populate("category", "category")
        .populate("brand", "name")
        return products
    } catch (error) {
        console.log(error)
    }
}

export const createProducts = async ( sellerID: string, payload: CreateProductPayload) => {
    try {
        const product = Product.create({ sellerID, ...payload })

        if (!product) {
            console.log("Error Creating Product")
            return
        }

        return product
    } catch (error) {
        console.log(error)
    }

}

export const getProductsbyID = () => {

}

export const updateProducts = () => {

}

export const deleteProduct = () => {

}