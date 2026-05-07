import { z } from "zod";
const zodid = z.number().min(1, "Нужно передать айди");
const zodname = z.string().min(3, "Минимум 3 символа");
export const createCatigories = z.object({ name: zodname });

export type createCatigoriesInput = z.infer<typeof createCatigories>;

export const deleteCategory = z.object({ id: zodid });

export const updateCategory = z.object({ id: zodid, name: zodname });
export type updateCategoryInput = z.infer<typeof updateCategory>;
