import { z } from "zod";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server";

type RouterOutput = inferRouterOutputs<AppRouter>;
const purchase = {
  productId: z.number(),
  supplierId: z.number(),
  quantity: z.number(),
  unitCost: z.number(),
  totalCost: z.number(),
  date: z.string().datetime().optional(),
};
export const purchaseCreateSchema = z.object(purchase);
export const purchaseUpdateSchema = z.object({...purchase, id: z.number()})
export const purchaseDeleteSchema = z.object({id: z.number()})
export type createPurchaseInput = z.infer<typeof purchaseCreateSchema>;
export type updatePurchaseInput = z.infer<typeof purchaseUpdateSchema>;
export type deletePurchaseInput = z.infer<typeof purchaseDeleteSchema>;