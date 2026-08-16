import type { Request, Response } from "express"
import * as services from "../services/productServices.js"

//get all products no filter
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await services.getProducts()

        if (!products) {
            console.log("Error Fetching Products")
        }

        res.status(201).json({ status: "successful", data: products })
    } catch (error) {
        console.log(error)
    }
}

//create a product
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

//check product stocks
export const checkStocks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const requestedQuantity = Number(quantity);

    if (!requestedQuantity || requestedQuantity <= 0) {
      return res.status(400).json({
        message: "Invalid quantity",
      });
    }

    const result = await services.checkStocks(id, requestedQuantity);

    return res.json(result);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to check stock",
    });
  }
};

export const getProductsbyID = () => {

}

export const updateProducts = () => {

}

export const deleteProduct = () => {

}
