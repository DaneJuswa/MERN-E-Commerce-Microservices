import { z } from "zod";

const variantSchema = z.object({
    sku: 
        z.string()
        .trim()
        .min(1),
    attributes: 
        z.record(z.string(), z.string()),
    price: 
        z.number()
        .nonnegative(),
    stock: 
        z.number()
        .int()
        .nonnegative(),
    images:
         z.array(z.string().url()).optional(),
});

// For POST /products
export const createProductSchema = z.object({
    name:
        z.string()
        .trim()
        .min(1)
        .max(200),
    description: 
        z.string()
        .trim()
        .min(1),
    price: 
        z.number()
        .nonnegative(),
   currency: 
        z.string()
        .length(3)
        .default("PHP"),
    sku: 
        z.string()
        .trim()
        .min(1),
    category: 
        z.string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
    brand: 
        z.string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid brand ID"),
    tags: 
        z.array(
            z.string().trim())
            .optional(),
    images: 
        z.array(z.string().url())
        .optional(),
    stock: 
        z.number()
        .int()
        .nonnegative()
        .optional(),
    isActive: 
        z.boolean()
        .optional(),
    hasVariants: 
        z.boolean()
        .optional(),
    variants: 
        z.array(variantSchema)
        .optional(),
})
    // reject any sellerId if the client tries to sneak it in
    .strict();

// For PATCH /products/:id — everything optional, still no sellerId allowed
export const updateProductSchema = createProductSchema.partial();


//Validator
export type CreateProductPayload = z.infer<typeof createProductSchema>