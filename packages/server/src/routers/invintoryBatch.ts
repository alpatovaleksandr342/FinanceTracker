import { router, publicProcedure } from "../trpc";

export const inventoryBatchRouter = router({
  getInventoryBatch: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.inventoryBatch.findMany({
      select: {
        id: true,
        initialQuantity: true,
        remainingQuantity: true,
        product: {
          select: {
            name: true,
          },
        },
        purchaseLine: {
          select: {
            supplier: { select: { name: true } },
          },
        },
        writeOffs:{select:{quantity:true}},
        saleItems: { select: { quantity: true } },
      },
    });
  }),
});
