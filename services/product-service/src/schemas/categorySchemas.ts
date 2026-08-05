import z from "zod";


export const createCategorySchema  = z.object({
    name: 
        z.string()
        .trim()
        .min(1, "Name is required")
        .max(100),
    description: 
        z.string()
        .trim()
        .min(1 , "Description is required"),
    image: 
        z.string()
        .url("Image must be valid url")
        .optional()
})
    .strict()


export const updateCategorySchema = createCategorySchema.partial();
 
export type CreateCategoryPayload = z.infer<typeof createCategorySchema>;
export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>;