import { prisma } from "./../db/prisma";
import { createCatigories, deleteCategory, updateCategory } from "shared";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const categotiesRouter = router({
  createCategori: publicProcedure
    .input(createCatigories)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.productCategory.create({ data: input });
    }),
  getAllCategoryes: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.productCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
  deleteCategory: publicProcedure
    .input(deleteCategory)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.productCategory.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateCategory: publicProcedure
    .input(updateCategory)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.productCategory.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
});