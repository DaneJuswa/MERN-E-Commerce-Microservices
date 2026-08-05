import type { CreateProductPayload } from "../schemas/productSchema.js"
import { Product } from "../models/Products.js"

export const getProducts = () => {

}

export const createProducts = async (payload: CreateProductPayload, sellerID: string) => {
    try {
        const product = Product.create({...payload, sellerID })

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