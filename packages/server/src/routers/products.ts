import { prisma } from "./../db/prisma";
import {
  createCatigories,
  createProduct,
  deleteCategory,
  updateCategory,
  updateProduct,
} from "shared";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const ProductRouter = router({
  createProduct: publicProcedure
    .input(createProduct)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.create({ data: input });
    }),
  updateProduct: publicProcedure
    .input(updateProduct)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
  getCategories: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.productCategory.findMany();
  }),
  getAllProduct: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        barcode: true,
        unit: true,
        unitLabel: true,
        category: true,
        price: true,
      },
    });
  }),
  deleteProduct: publicProcedure.input(deleteCategory).mutation(async ({ctx, input})=>{
    return ctx.prisma.product.delete({
      where:{
        id: input.id
      }
    })
  })
});
