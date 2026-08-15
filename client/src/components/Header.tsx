import { Search, ShoppingBag, LogOut } from "lucide-react";
import { useState } from "react";
import type { Category } from "../types/categories";
import { getCategoryMeta } from "../shared/categories";
import { logout } from "../apis/auth";


interface HeaderProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}



export default function Header({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      await logout()
      setLoggingOut(true);
      
      console.log("Successfully logged out");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

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

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full px-3 py-2"
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

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full px-3 py-2 disabled:opacity-50"
            aria-label="Log out"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline text-sm font-medium">
              {loggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
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
          const active = cat.category === activeCategory;
          const { icon: Icon, color } = getCategoryMeta(cat.category);

          return (
            <button
              key={cat._id}
              onClick={() => onCategoryChange(cat.category)}
              className={`flex gap-2 font-display text-xs tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                active
                  ? "bg-white text-green-900"
                  : "text-white/75 border border-white/25"
              }`}
            >
              <Icon size={16} color={color} />
              {cat.category.toUpperCase()}
            </button>
          );
        })}
      </div>
    </header>
  );
}