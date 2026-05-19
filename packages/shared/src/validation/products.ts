import z from "zod";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type ProductFromDB = RouterOutput["products"]["getAllProduct"][number];


const product = {
name: z.string(),
barcode: z.string(),
unit: z.number(),
categoryId: z.number(),
price: z.number()

}
export const createProduct = z.object(product)

export const updateProduct = z.object({...product, id: z.number()})

export const deleteProduct = z.object({id: z.number()})

export type createProductInput = z.infer<typeof createProduct>;