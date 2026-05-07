import {z} from "zod";

export const createCatigories = z.object({name: z.string().min(3,"Минимум 3 символа")})

export type createCatigoriesInput = z.infer<typeof createCatigories>;


export const deleteCategory = z.object({id:z.number().min(1,"Нужно передать айди")});