import type { CartDrawerProps } from "../types/CartDrawerProps.js";
import { X, Plus, Minus } from "lucide-react";
import ProductTile from "./ProductTile.js";
import { money } from "../apis/fetchproducts.js";


export interface ItemsOnCart {
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

export default function CartDrawer({
  open,
  onClose,
  cartItems,
  subtotal,
  shipping,
  total,
  onSetQty,
  onCheckout,
}: CartDrawerProps) {
  if (!open) return null;

  console.log("test")
  cartItems.map((items: any) => console.log(items))
   console.log("test")
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="drawer-enter relative w-full sm:w-96 h-full flex flex-col bg-card">
        <div className="flex items-center justify-between px-5 py-4 bg-ink">
          <p className="font-display text-white text-sm tracking-wide">YOUR CART</p>
          <button
            onClick={onClose}
            className="text-white/80 focus:outline-none focus-visible:ring-2 rounded-full"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>
        <div className="tear" />

        <div className="flex-1 overflow-y-auto px-5">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-black/50">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="mt-4 font-display text-xs px-4 py-2 rounded-full bg-mustard text-ink"
              >
                BROWSE PRODUCTS
              </button>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {cartItems.map((item) => (
                <div key={item.productID} className="py-4 flex gap-3">
                  <ProductTile product={item} size="small" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                    <p className="font-mono text-xs text-black/50 mt-0.5">{money(item.price)} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onSetQty(item.productID, item.quantity - 1)}
                        className="h-6 w-6 rounded-full flex items-center justify-center border border-line focus:outline-none focus-visible:ring-2"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onSetQty(item.productID, item.quantity + 1)}
                        className="h-6 w-6 rounded-full flex items-center justify-center border border-line focus:outline-none focus-visible:ring-2"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => onSetQty(item.productID, 0)}
                        className="ml-auto text-xs font-mono text-black/40 hover:text-rust focus:outline-none"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <span className="font-mono text-sm">{money(item.quantity * item.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-5 py-4 font-mono text-sm border-t border-dashed border-line">
            <div className="flex justify-between text-black/60">
              <span>SUBTOTAL</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between text-black/60 mt-1">
              <span>SHIPPING</span>
              <span>{shipping === 0 ? "FREE" : money(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2 text-base text-ink">
              <span>TOTAL</span>
              <span>{money(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full mt-4 font-display text-sm py-3 rounded-full text-white bg-ink"
            >
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
