import { create } from "node:domain";
import { router, publicProcedure } from "../trpc";
import { CreateWriteOffZod, DeleteWriteOffZod } from "shared";
import { TRPCError } from "@trpc/server";

export const writeOffRouter = router({
  getWriteOff: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.writeOff.findMany({
      select: {
        id: true,
        quantity: true,
        date: true,
        reason: true,
        product: { select: { name: true } },
      },
    });
  }),
  createWriteOff: publicProcedure
    .input(CreateWriteOffZod)
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

      return await ctx.prisma.writeOff.create({
        data: { ...input, productId: batch.productId },
      });
    }),
  deleteWriteOff: publicProcedure
    .input(DeleteWriteOffZod)
    .mutation(async ({ ctx, input }) => {
      const writeOff = await ctx.prisma.writeOff.delete({
        where: { id: input.id },
      });

      await ctx.prisma.inventoryBatch.update({
        where: { id: writeOff.batchId },
        data: {
          remainingQuantity: {
            increment: writeOff.quantity,
          },
        },
      });
      return writeOff;
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
