import {
  CreatetransactionZod,
  DeleteTransactionZod,
  UpdateTransactionZod,
} from "shared";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const cashSessionRouter = router({
  CreateTransaction: publicProcedure
    .input(CreatetransactionZod)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.cashTransaction.create({
        data: input,
      });
    }),
  UpdateTransaction: publicProcedure
    .input(UpdateTransactionZod)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.cashTransaction.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
  DeleteTransaction: publicProcedure
    .input(DeleteTransactionZod)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.cashTransaction.delete({
        where: input,
      });
    }),
    getAllTransaction: publicProcedure
    .query(async ({ctx})=>{
        return ctx.prisma.cashTransaction.findMany()
    })
});
