import type { CreateProductPayload } from "../schemas/productSchema.js"
import { Product } from "../models/Products.js"

export const getProducts = async () => {
    try {
        const products = await Product.find()
        .populate("category", "category")
        .populate("brand", "name")
        return products
    } catch (error) {
        console.log(error)
    }
}

export const createProducts = async ( sellerID: string, payload: CreateProductPayload) => {
    try {
        const product = Product.create({ sellerID, ...payload })

        if (!product) {
            console.log("Error Creating Product")
            return
        }

        return product
    } catch (error) {
        console.log(error)
    }

}

export const getProductsByIds = async (ids: string[]) => {
    if (!ids || ids.length === 0) return [];
    return Product.find({ _id: { $in: ids } }).lean();
};

export const updateProducts = () => {

}

export const deleteProduct = () => {

}

//use for checking out
// export const decrementStock = async (
//     productID: string,
//     quantity: number,
//     variantID?: string
// ) => {
//     const product = await Product.findById(productID);
//     if (!product) throw new Error("PRODUCT_NOT_FOUND");

//     if (variantID) {
//         const variant = product.variants?.find(
//             (v) => v._id.toString() === variantID
//         );
//         if (!variant) throw new Error("VARIANT_NOT_FOUND");
//         if (variant.stock < quantity) throw new Error("INSUFFICIENT_STOCK");
//         variant.stock -= quantity;
//     } else {
//         if (product.stock < quantity) throw new Error("INSUFFICIENT_STOCK");
//         product.stock -= quantity;
//     }

//     await product.save();
//     return product;
// };