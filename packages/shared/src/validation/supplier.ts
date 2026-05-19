import { z } from "zod";
const zodid = z.number().min(1, "Нужно передать айди");
const zodname = z.string().min(3, "Минимум 3 символа");
export const createSuppliers = z.object({ name: zodname });

export type createSuppliersInput = z.infer<typeof createSuppliers>;

export const deleteSupplier = z.object({ id: zodid });

export const updateSupplier = z.object({ id: zodid, name: zodname });
export type updateSupplierInput = z.infer<typeof updateSupplier>;