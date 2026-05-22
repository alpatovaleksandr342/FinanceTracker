import {z} from "zod"
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type writesOffFromDB = RouterOutput["writeOff"]["getWriteOff"][number]


const BaseWriteOff = 
{
    batchId: z.number({message: "Поставку указывать обязательно"}),
    quantity: z.number({message: "Количество обязательно"}).positive({message: "Количество должно быть положительным"}),
    reason: z.enum(['delay','decay',"steal"], {message: "Укажите причину списания"}),
    date: z.string().datetime().optional()
}

const id = {
    id: z.number()
}

export const CreateWriteOffZod = z.object(BaseWriteOff)

export type CreateWriteOffInput = z.infer<typeof CreateWriteOffZod>;

export const UpdateWriteOffZod = z.object({...BaseWriteOff, ...id})

export const DeleteWriteOffZod = z.object(id)
