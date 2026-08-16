
const API_BASE = "http://localhost:3000"

export interface CartItems {
    cartItemId: string;
    productID: string;
    variantID: string;
    name: string;
    quantity: number;
    price: number;
    lineTotal: number;
    inStock: boolean;
    stockRemaining: number
}

export interface CartReceive {
    userID: string;
    items: CartItems[];
    summary: {
        totalItems: number;
        subtotal: number;
        currency: string
    }
}



export const getCart = async (): Promise<CartReceive> => {
    try {
        const response = await fetch(`${API_BASE}/api/cart`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Failed to fetch cart");
        }

        const data: CartReceive = await response.json();

        return data

    } catch (error) {
        console.log("Error fetching cart", error)
        throw error
    }

}

export const addToCartAPI = async (
    productID: string,
    quantity: number,
    variantID?: string
) => {
    try {
      
        const response = await fetch(`${API_BASE}/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                productID,
                quantity,
                ...(variantID && { variantID }),
            }),
        });
        console.log("aabot kaya ya")
        console.log("RESPONSE STATUS:", response.status);

        const data = await response.json();

        console.log("RESPONSE DATA:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to add to cart");
        }

        return data;
    } catch (error) {
        console.error("ADD TO CART API ERROR:", error);
        throw error; // IMPORTANT
    }
};


export const updateCartItem = async (
    cartItemId: string,
    quantity: number
) => {
    console.log("add ngani")
    const response = await fetch(
        `${API_BASE}/api/cart/${cartItemId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                quantity,
            }),
        }
    );
    console.log("umabot ba ya")
    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update cart item"
        );
    }

    return data;
};