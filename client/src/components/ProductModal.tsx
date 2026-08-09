import { X } from "lucide-react";
import ProductTile from "./ProductTile.js";
import { money } from "../apis/fetchproducts.js";
import type { ProductCard } from "../types/products.js";

interface ProductModalProps {
  product: ProductCard | null;
  onClose: () => void;
  onAddToCart: (product: ProductCard, quantity: number) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
 
  return (
    <div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-t-xl sm:rounded-xl w-full sm:max-w-lg overflow-hidden bg-card"
      >
        <div className="relative">
          <ProductTile product={product} />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center focus:outline-none focus-visible:ring-2"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          <p className="text-[11px] font-mono uppercase tracking-wide text-black/45">
            {product.category?.category ?? "Uncategorized"}
          </p>

          <p className="font-display text-xl mt-1">
            {product.name}
          </p>

          <div className="flex items-center justify-between mt-5">
            <span className="font-mono text-lg">
              {money(product.price)}
            </span>

            <button
              onClick={() => onAddToCart(product, 1)}
              className="font-display text-sm px-5 py-2.5 rounded-full text-white bg-ink"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}