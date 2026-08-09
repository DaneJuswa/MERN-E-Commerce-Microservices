import { Router, type Request, type Response } from "express";
import { getProductsByIds } from "../services/productServices.js"

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { ids } = req.body as { ids: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.json([]);
    }

    const products = await getProductsByIds(ids);
    console.log(products)
    res.json(products);
});

// router.post(
//     "/internal/products/:id/decrement-stock",
//     async (req: Request, res: Response) => {
//         const { id } = req.params;
//         const { quantity, variantID } = req.body as {
//             quantity: number;
//             variantID?: string;
//         };

//         try {
//             const product = await decrementStock(id, quantity, variantID);
//             res.json(product);
//         } catch (error: any) {
//             if (error.message === "PRODUCT_NOT_FOUND") {
//                 return res.status(404).json({ error: "Product not found" });
//             }
//             if (error.message === "VARIANT_NOT_FOUND") {
//                 return res.status(404).json({ error: "Variant not found" });
//             }
//             if (error.message === "INSUFFICIENT_STOCK") {
//                 return res.status(409).json({ error: "Insufficient stock" });
//             }
//             res.status(500).json({ error: "Something went wrong" });
//         }
//     }
// );

export default router;