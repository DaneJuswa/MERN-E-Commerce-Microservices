import { Loader2 } from "lucide-react";
import ProductTile from "./ProductTile.js";
import { money } from "../apis/fetchproducts.js";
import type { ProductCard } from "../types/products";

interface ProductGridProps {
  products: ProductCard[];
  loading: boolean;
  onSelect: (product: ProductCard) => void;
}

export default function ProductGrid({
  products,
  loading,
  onSelect,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-black/50 py-20 justify-center">
        <Loader2 size={16} className="animate-spin" /> Loading catalog…
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-lg">Nothing here yet.</p>
        <p className="text-sm text-black/50 mt-1">
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onSelect(product)}
          className="text-left rounded-lg overflow-hidden border border-line bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-mustard group"
        >
          <ProductTile product={product} />
          <div className="p-3">
            <p className="text-[11px] font-mono uppercase tracking-wide text-black/45">
              {product.category?.category ?? "Uncategorized"}
            </p>
            <p className="font-medium text-sm mt-0.5 leading-snug">
              {product.name}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-mono text-sm">{money(product.price)}</span>
              <span className="text-xs font-display px-2 py-1 rounded-full bg-ink text-white opacity-0 group-hover:opacity-100 transition-opacity">
                VIEW
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
