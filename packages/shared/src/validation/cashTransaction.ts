import {z} from "zod"
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type transactionFromDB = RouterOutput["cashTransaction"]["getAllTransaction"][number]

export enum transactionsType{
    sale = "sale",
    expense ="expense",
    withdraw = "withdraw"
}

const BaseTransaction = 
{
    sessionId: z.number(),
    type: z.enum(['sale','expense',"withdraw"]),
    amount: z.number(),
    description: z.string().optional(),
    date: z.string().datetime().optional()
}

const id = {
    id: z.number()
}

export const CreatetransactionZod = z.object(BaseTransaction)

export const UpdateTransactionZod = z.object({...BaseTransaction, ...id})

export const DeleteTransactionZod = z.object(id)
