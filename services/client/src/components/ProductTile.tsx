
import { CATEGORY_META } from "../shared/categories";

// Renders the product's real image if one exists (from the backend),
// otherwise falls back to a colored icon tile so the grid never looks broken.
export default function ProductTile({ product, size = "normal" }) {
  const meta = CATEGORY_META[product.category];
  const Icon = meta?.icon;
  const sizeClasses = size === "small" ? "h-16 w-16" : "aspect-square w-full";

  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className={`${sizeClasses} object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${sizeClasses}`}
      style={{ backgroundColor: (meta?.color || "#999999") + "1A" }}
    >
      {Icon && <Icon size={size === "small" ? 22 : 40} style={{ color: meta.color }} strokeWidth={1.5} />}
    </div>
  );
}
