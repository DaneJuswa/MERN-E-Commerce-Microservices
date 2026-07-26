
import type { Product } from "../types/product";
export const API_BASE = ""; // e.g. "http://localhost:4000/api"

export async function fetchProducts(): Promise<Product[]> {
  // const res = await fetch(`${API_BASE}/products`);
  // if (!res.ok) throw new Error("Failed to load products");
  // return res.json();
  await new Promise((r) => setTimeout(r, 350));
  return MOCK_PRODUCTS;
}



export const MOCK_PRODUCTS = [
  { id: "p1", name: "Waxed Canvas Tote", category: "Womens", price: 58, blurb: "14oz waxed canvas, leather straps, holds a laptop and lunch without complaint." },
  { id: "p2", name: "Field Duffel", category: "Mens", price: 92, blurb: "Weekend bag with a brass zip and a strap that won't dig into your shoulder." },
  { id: "p3", name: "Dot-Grid Notebook", category: "Appliances", price: 16, blurb: "160 pages of dot-grid, lays flat, survives a coat pocket." },
  { id: "p4", name: "Pocket Ledger", category: "Electronics", price: 9, blurb: "Small enough to carry, ruled enough to actually use." },
  { id: "p5", name: "6-Piece Driver Set", category: "Appliances", price: 34, blurb: "Magnetic tips, a handle that doesn't slip, a case that closes properly." },
  { id: "p6", name: "Folding Utility Knife", category: "Appliances", price: 22, blurb: "Locks open, locks closed, replaceable blade." },
  { id: "p7", name: "Stoneware Mug", category: "Appliances", price: 24, blurb: "Holds heat, holds its shape, stacks in the cupboard." },
  { id: "p8", name: "Cast Iron Trivet", category: "Appliancesome", price: 19, blurb: "Heavy enough to matter, small enough to store." },
   
];

export function money(n) {
  return "$" + n.toFixed(2);
}
