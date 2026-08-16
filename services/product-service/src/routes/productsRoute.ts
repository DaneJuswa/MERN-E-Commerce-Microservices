import { Router } from "express";
import * as controller from "../controllers/productsController.js"
import { validate } from "../middleware/validatePayload.js";
import { createProductSchema } from "../schemas/productSchema.js";
import { publishProductCreated } from "../kafka/producer.js";
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

router.post("/test-kafka", async (req, res) => {
    try {
        await publishProductCreated({
            productId: "test-223-mama-ppa",
            name: "Test Product mama",
            price: 100
        });

        res.json({
            success: true,
            message: "Kafka event published"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Kafka event failed"
        });
    }
});

export default router