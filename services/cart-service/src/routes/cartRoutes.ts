import { Router } from "express";
import * as cartController from "../controllers/cartControllers.js"

const router = Router()

//add to cart
router.post("/",cartController.addToCart )

//get cart
router.get("/", cartController.getCart)

//delete from cart
router.delete("/:id", cartController.deleteItem)

//update cart
router.patch("/:id", cartController.updateItem)


export default router