import { Search, ShoppingBag } from "lucide-react";

export default function Header({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  cartCount,
  onOpenCart,
}) {
  return (
    <header className="bg-ink sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center gap-6">
        <div className="font-display text-white text-xl tracking-wide whitespace-nowrap">
          GOODWORK <span className="text-mustard">SUPPLY CO.</span>
        </div>

        <div className="hidden sm:flex flex-1 items-center gap-2 bg-white/10 rounded-full px-4 py-2 max-w-md">
          <Search size={16} className="text-white/60" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products"
            className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full"
          />
        </div>

        <button
          onClick={onOpenCart}
          className="relative ml-auto flex items-center gap-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full px-3 py-2"
          aria-label={`Open cart, ${cartCount} items`}
        >
          <ShoppingBag size={20} />
          <span className="hidden sm:inline text-sm font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-xs font-mono font-semibold rounded-full h-5 w-5 flex items-center justify-center bg-mustard text-ink">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="sm:hidden px-5 pb-3 flex items-center gap-2 bg-white/10 mx-5 rounded-full">
        <Search size={16} className="text-white/60 ml-2" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search products"
          className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full py-2"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 pb-3 flex gap-2 overflow-x-auto">
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`font-display text-xs tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                active ? "bg-white text-green-900" : "text-white/75 border border-white/25"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          );
        })}
      </div>
    </header>
  );
}
