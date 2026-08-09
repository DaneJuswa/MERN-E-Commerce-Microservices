export type CartItems =  {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItems[];
  subtotal: number;
  shipping: number;
  total: number;
  onSetQty: (cartItemId: string, quantity: number) => void;
  onCheckout: () => void;
}
