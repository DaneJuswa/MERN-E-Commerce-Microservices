
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