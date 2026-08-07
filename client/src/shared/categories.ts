import type { LucideIcon } from "lucide-react";
import {ShoppingBag, Shirt, Refrigerator, Cpu, Home, HelpCircle} from "lucide-react";

export interface CategoryMeta {
  icon: LucideIcon;
  color: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  Mens: {
    icon: Shirt,
    color: "#D9A53C",
  },
  Womens: {
    icon: ShoppingBag,
    color: "#E78FB3",
  },
  Clothing: {
    icon: ShoppingBag,
    color: "#6E7C5B",
  },
  Appliances: {
    icon: Refrigerator,
    color: "#4E6E8E",
  },
  Electronics: {
    icon: Cpu,
    color: "#B3492F",
  },
};

export const DEFAULT_CATEGORY_META: CategoryMeta = {
  icon: HelpCircle, // or Home if you prefer
  color: "#6B7280",
};

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? DEFAULT_CATEGORY_META;
}