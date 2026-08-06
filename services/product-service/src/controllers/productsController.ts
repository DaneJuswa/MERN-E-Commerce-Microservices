import type{ Request, Response } from "express"
import * as services from "../services/productServices.js"

//get all products no filter
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await services.getProducts()

        if(!products){
            console.log("Error Fetching Products")
        }

        res.status(201).json({status: "successful", data: products })
    } catch (error) {
        console.log(error)
    }
}

export const createProducts = async (req: Request, res: Response) => {
    try {
        const sellerID = req.headers["x-user-id"] as string;

        if (!sellerID) {
            return res.status(401).json({ message: "Missing user identity" });
        }

        const created = await services.createProducts(sellerID, req.body);

        return res.status(201).json(created);
    } catch (error) {
        console.error("createProducts failed:", error);
        return res.status(500).json({ message: "Failed to create product" });
    }
};

export const getProductsbyID = () => {

}

export const updateProducts = () => {

}

export const deleteProduct = () => {

}
