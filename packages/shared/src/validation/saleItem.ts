import {z} from "zod"
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type SaleItemFromDB = RouterOutput["sale"]["getSaleItems"][number]


const BaseSaleItem = 
{
    batchId: z.number({message: "Поставку указывать обязательно"}),
    quantity: z.number({message: "Количество обязательно"}).positive({message: "Количество должно быть положительным"}),
    unitPrice: z.number({message: "Цену указывать обязательно"}),
    date: z.string().datetime().optional()
}

const id = {
    id: z.number()
}

export const CreateSaleItem = z.object(BaseSaleItem)

export type CreateSaleItemInput = z.infer<typeof CreateSaleItem>;

export const UpdateSaleItem = z.object({...BaseSaleItem, ...id})

export const DeleteSaleItem = z.object(id)
