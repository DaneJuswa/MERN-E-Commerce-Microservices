import { Router } from "express";
import * as controller from "../controllers/productsController.js"
import { validate } from "../middleware/validatePayload.js";
import { createProductSchema } from "../schemas/productSchema.js";

const router =  Router()

//check a product stocks
router.get("/:id/check-stock", controller.checkStocks);

//fetch products
router.get("/", controller.getProducts)

//create Products
router.post("/", validate(createProductSchema), controller.createProducts)

//fetch products by id
router.get("/:id", controller.getProductsbyID)

//update a product
router.patch("/:id", controller.updateProducts)

//delete a product
router.delete("/:id", controller.deleteProduct)



export default router