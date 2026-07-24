export type OrderPayload = {
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];

  customer: {
    name: string;
    email: string;
  };

  shippingAddress: {
    street: string;
    city: string;
    zip: string;
  };

  paymentMethod: "COD" | "GCash" | "Card";

  totalAmount: number;
};