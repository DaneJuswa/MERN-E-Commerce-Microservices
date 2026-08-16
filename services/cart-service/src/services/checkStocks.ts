const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:4001";

export const checkProductStock = async (productID: string, quantity: number) => {

    const url = new URL(`${PRODUCT_SERVICE_URL}/api/products/${productID}/check-stock`);
    url.searchParams.append("quantity", String(quantity));

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Failed to check stock: ${response.status} ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        
    }

};