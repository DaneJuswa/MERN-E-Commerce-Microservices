export type ProductsCategory = 
 | "Mens" 
 | "Womens" 
 | "Clothing"
 | "Appliances" 
  | "Electronics";

  export type Products = {
    id: number,
    name: string,
    category : ProductsCategory,
    price: number,
    blurb: string
  }