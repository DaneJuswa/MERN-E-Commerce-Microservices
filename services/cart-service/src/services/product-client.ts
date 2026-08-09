const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

export interface ProductResponse {
  _id: string;
  name: string;
  image?: string;
  price: number;
  stock: number;
  variants?: {
    _id: string;
    label: string;
    price?: number;
    stock: number;
  }[];
}

/**
 * Fetches current product data (price, stock, name)
 * for a batch of product IDs.
 *
 * This is a live lookup — product data is not cached
 * inside the cart.
 */
export async function fetchProductsByIds(productIds: string[]): Promise<ProductResponse[]> {
  if (productIds.length === 0) return [];

  const response = await fetch(
    `http://localhost:4001/internal/products/batch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: productIds,
      }),
      signal: AbortSignal.timeout(3000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Product service returned ${response.status}: ${response.statusText}`
    );
  }

  const data: ProductResponse[] = await response.json();

  return data;
}