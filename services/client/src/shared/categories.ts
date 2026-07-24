import type {ProductsCategory}  from "../types/products";
import { ShoppingBag, Shirt, Wrench,  Refrigerator, Cpu,Home as HomeIcon, BookOpen } from "lucide-react";

export const CATEGORY_META: Record<ProductsCategory, {
  icon: any;
  color: string;
}> = {
  Mens: { icon: Shirt, color: "#D9A53C" },
  Womens: { icon: ShoppingBag, color: "#E78FB3" },
  Clothing: { icon: ShoppingBag, color: "#6E7C5B" },
  Appliances: { icon: Refrigerator, color: "#4E6E8E" },
  Electronics: { icon: Cpu, color: "#B3492F" },
};