export type CartItem =  {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onSetQty: (id: string, qty: number) => void;
  onCheckout: () => void;
}