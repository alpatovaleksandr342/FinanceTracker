import { create } from "domain";
import { router, publicProcedure } from "../trpc";
import { purchaseCreateSchema } from "shared";
import { purchaseDeleteSchema } from "shared";
import { purchaseUpdateSchema } from "shared";

export const purchaseRouter = router({
  createPurchase: publicProcedure
    .input(purchaseCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.purchaseLine.create({ data: input });
    }),
  getAllPurchase: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.purchaseLine.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
  purchaseDelete: publicProcedure
    .input(purchaseDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.purchaseLine.delete({
        where: {
          id: input.id,
        },
      });
    }),
  purchaseUpdate: publicProcedure
    .input(purchaseUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.purchaseLine.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
  getProducts: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.product.findMany({
      select: { id: true, name: true },
    });
  }),
  getSuppliers: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.supplier.findMany({
      select: { id: true, name: true },
    });
  }),
});
