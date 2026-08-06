import z from "zod";

export const createBrandSchema = z.object({
    name: 
        z.string()
        .trim()
        .min(1, "Brand Name is Required")
        .max(100),
    description: 
        z.string()
        .trim(),
    logo: 
        z.string()
})

    .strict()



//schema for updating (not all fields are required)
export const updateBrandSchema = createBrandSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  });


//types for creating and updating brand
export type createBrandPayload = z.infer<typeof createBrandSchema> 
export type updateBrandPayload = z.infer<typeof updateBrandSchema>