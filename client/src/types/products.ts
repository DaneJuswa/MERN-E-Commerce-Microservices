export type ProductCard = {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: { _id: string; category: string } | null;
  brand: { _id: string; name: string } | null;
  image: string;       // just the first image, not the whole array
  inStock: boolean;
  ratingsAverage: number;
  ratingsCount: number;
};

export type ProductDetail = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  sku: string;
  category: string;
  brand: string;
  tags: string[];
  images: string[];
  stock: number;
  inStock: boolean;
  ratingsAverage: number;
  ratingsCount: number;
  hasVariants: boolean;
  variants: Variant[];
  slug: string;
};