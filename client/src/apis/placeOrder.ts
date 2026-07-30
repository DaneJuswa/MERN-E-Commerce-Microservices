import type { OrderPayload } from "../types/orderPayload";


export async function placeOrder(orderPayload: OrderPayload) {

  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderPayload)
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}