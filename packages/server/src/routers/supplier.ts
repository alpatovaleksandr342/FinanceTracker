import { createCatigories, createSuppliers, deleteCategory, deleteSupplier, updateCategory, updateSupplier } from "shared";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const supplierRouter = router({
  createSupplier: publicProcedure
    .input(createSuppliers)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.supplier.create({ data: input });
    }),
  getAllSupplieres: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
  deleteSupplier: publicProcedure
    .input(deleteSupplier)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.supplier.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateSupplier: publicProcedure
    .input(updateSupplier)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.supplier.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
});