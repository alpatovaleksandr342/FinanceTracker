import {z} from "zod"

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type SessionFromDB = RouterOutput["cashSession"]["getAllSession"][number];


const BaseCashSession = {
    storeId: z.number(),
    openDate: z.string().datetime("Не дата").optional(),
    closeDate: z.string().datetime("Не дата").optional()
}

export const createCashSession = z.object(BaseCashSession)
export type createCashSessionInput = z.infer<typeof createCashSession>;

export const updateCashSession = z.object({...BaseCashSession, id: z.number()})

export const deleteCashSession = z.object({id: z.number()})