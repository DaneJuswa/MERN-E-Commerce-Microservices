import type{ Request, Response } from "express"
import * as cartService from "../services/cartService.js"
import Cart from "../model/cartModel.js";
//add to Cart
export const addToCart = async (req: Request, res: Response) => {
  const userID = req.headers["x-user-id"] as string;

  const { productID, variantID, quantity } = req.body;

  if (!productID) {
    return res.status(400).json({
      error: "productID is required",
    });
  }

  try {
    const cart = await cartService.addToCart(userID, productID, quantity ?? 1, variantID);

    res.status(201).json(cart);

  } catch (error: any) {

    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (error.message === "INVALID_QUANTITY") {
      return res.status(400).json({
        error: "Quantity must be at least 1",
      });
    }

    if (error.message === "PRICE_SERVICE_UNAVAILABLE") {
      return res.status(503).json({
        error: "Product service unavailable",
      });
    }

    return res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
};

//get all Carts 
export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = req.headers["x-user-id"] as string;
        console.log(userId)
        const cart = await cartService.getCart(userId)

        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
    }
}

//update item in cart
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      "items._id": id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item._id.toString() === id
    );

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    item.quantity = quantity;

    await cart.save();

    return res.status(200).json({
      message: "Cart item updated",
      item,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update cart item",
    });
  }
};

//delete item in cart
export const deleteItem = async (req: Request, res: Response) => {

}

