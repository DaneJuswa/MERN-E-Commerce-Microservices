import type{ Request, Response } from "express"
import * as services from "../services/productServices.js"

export const getProducts = (req: Request, res: Response) => {

}

export const createProducts = async (req: Request, res: Response) => {
    try {
        const sellerID = req.headers["x-user-id"] as string;

        if (!sellerID) {
            return res.status(401).json({ message: "Missing user identity" });
        }

        // Validate req.body against a schema here (zod/joi/etc.)
        // before trusting any of its fields.
        const created = await services.createProducts({
            payload: { ...req.body },
            sellerID,
        });

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
