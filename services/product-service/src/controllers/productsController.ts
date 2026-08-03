import type{ Request, Response } from "express"
import * as services from "../services/productServices.js"

export const getProducts = (req: Request, res: Response) => {

}

export const createProducts = (req: Request, res: Response) => {
    try {
        const sellerID = req.headers["x-user-id"] as string;

        if(!sellerID){
            return res.status(401).json({ message: "Missing user identity" });
        }
    } catch (error) {
        
    }


}

export const getProductsbyID = () => {

}

export const updateProducts = () => {

}

export const deleteProduct = () => {

}
