import z from "zod";

export const createProduct = z.object({
name: z.string(),
barcode: z.string(),
unit: z.string(),
categoryId: z.number(),
price: z.number()

})