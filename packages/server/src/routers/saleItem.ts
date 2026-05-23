import { create } from "node:domain";
import { router, publicProcedure } from "../trpc";
import {
  CreateSaleItem,
  CreateWriteOffZod,
  DeleteSaleItem,
  DeleteWriteOffZod,
} from "shared";
import { TRPCError } from "@trpc/server";

export const saleItemRouter = router({
  getSaleItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.saleItem.findMany({
      select: {
        id: true,
        quantity: true,
        unitPrice: true,
        total: true,
        date: true,
        product: { select: { name: true } },
      },
    });
  }),
  createSaleItem: publicProcedure
    .input(CreateSaleItem)
    .mutation(async ({ ctx, input }) => {
      const batch = await ctx.prisma.inventoryBatch.findUnique({
        where: { id: input.batchId },
        select: { productId: true },
      });
      if (!batch) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Batch not found",
        });
      }

      await ctx.prisma.inventoryBatch.update({
        where: { id: input.batchId },
        data: {
          remainingQuantity: {
            decrement: input.quantity,
          },
        },
      });

      return await ctx.prisma.saleItem.create({
        data: {
          ...input,
          productId: batch.productId,
          total: input.quantity * input.unitPrice,
        },
      });
    }),
  deleteSaleItem: publicProcedure
    .input(DeleteSaleItem)
    .mutation(async ({ ctx, input }) => {
      const saleItem = await ctx.prisma.saleItem.delete({
        where: { id: input.id },
      });

      await ctx.prisma.inventoryBatch.update({
        where: { id: saleItem.batchId },
        data: {
          remainingQuantity: {
            increment: saleItem.quantity,
          },
        },
      });
      return saleItem;
    }),

  getBatchesList: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.inventoryBatch.findMany({
      select: {
        id: true,
        product: { select: { name: true } },
        remainingQuantity: true,
        receivedDate: true,
      },
      where: {
        remainingQuantity: {
          gt: 0,
        },
      },
      orderBy: {
        receivedDate: "asc",
      },
    });
  }),
});
