import {
  createCashSession,
  createCatigories,
  deleteCashSession,
  deleteCategory,
  updateCashSession,
  updateCategory,
} from "shared";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const cashSessionRouter = router({
  createSession: publicProcedure
    .input(createCashSession)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.cashSession.create({ data: input });
    }),
  getAllSession: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.cashSession.findMany();
  }),
  deleteSession: publicProcedure
    .input(deleteCashSession)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.cashSession.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateSession: publicProcedure
    .input(updateCashSession)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.cashSession.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
