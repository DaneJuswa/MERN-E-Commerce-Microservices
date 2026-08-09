import Cart from "../model/cartModel.js"
import { fetchProductsByIds, type ProductResponse } from "./product-client.js";

//each items in cart
export interface CartItemResponse {
    cartItemId: string;
    productID: string;
    variantID?: string;      // made optional — not every item has a variant
    name: string;
    image?: string;
    variantLabel?: string;
    quantity: number;
    price: number;
    lineTotal: number;
    inStock: boolean;
    stockRemaining: number
}

export interface cartResponse {
    userID: string;
    items: CartItemResponse[];
    error?: string;
    summary: {
        totalItems: number;
        subtotal: number;
        currency: string;
    };
    message: string
};

//fetch cart, every call use product service as source of truth for stocks and current price
export const getCart = async (userID: string): Promise<cartResponse> => {

    const cart = await Cart.findOne({ userID }).lean();

    if (!cart || cart.items.length == 0) {
        return {
            userID,
            items: [],
            summary: { totalItems: 0, subtotal: 0, currency: "PHP" },
            message: "No items in the cart yet!"
        };
    }

    const productIDs = [...new Set(cart.items.map((item) => item.productID))]

    let products: ProductResponse[] = []

    try {
        products = await fetchProductsByIds(productIDs)
        console.log(products)

    } catch (error) {
        return {
            userID,
            items: [],
            summary: { totalItems: 0, subtotal: 0, currency: "PHP" },
            message: "failed to fetch cart",
            error: "PRICE_SERVICE_UNAVAILABLE",
        };
    }

    const productMap = new Map(products.map((p) => [p._id, p]));

    const items: CartItemResponse[] = cart.items.map((item) => {
        const product = productMap.get(item.productID);
        const variant = product?.variants?.find((v) => v._id === item.variantID);

        const price = variant?.price ?? product?.price ?? 0;
        const stockRemaining = product?.stock ?? 0

        return {
            cartItemId: item._id.toString(),
            productID: item.productID,      // fixed casing — was productId
            variantID: item.variantID,      // fixed casing — was variantId
            name: product?.name ?? "Product no longer available",
            image: product?.image,
            variantLabel: variant?.label,
            quantity: item.quantity,
            price,
            lineTotal: price * item.quantity,
            inStock: stockRemaining >= item.quantity,
            stockRemaining,
        };
    })

    // compute these — they were referenced but never calculated
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);

    return {
        userID,
        items,
        summary: {
            totalItems,
            subtotal,
            currency: "PHP",
        },
        message: "successfully fetch cart"
    }
}
//for adding to cart
export const addToCart = async (userID: string, productID: string, quantity: number = 1, variantID?: string) => {
    let products: ProductResponse[] = []

    try {
        products = await fetchProductsByIds([productID]);
    } catch (error) {
        console.error("FETCH PRODUCT ERROR:", error);
        throw new Error("PRICE_SERVICE_UNAVAILABLE");
    }

    const product = products[0]

    //check if the product exist
    if (!product) {
        throw new Error("PRODUCT_NOT_FOUND");
    }

    //check if it still has quantity
    if (quantity < 1) {
        throw new Error("INVALID_QUANTITY");
    }

    let cart = await Cart.findOne({ userID });

    //if 1st time adding to cart
    if (!cart) {
        cart = new Cart({ userID, items: [] });
    }

    //if same item or variant added to cart
    const existingItem = cart.items.find(
        (item) =>
            item.productID === productID &&
            item.variantID === variantID
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({productID, variantID, quantity,} as any);
    }

    await cart.save()

    return getCart(userID)
}