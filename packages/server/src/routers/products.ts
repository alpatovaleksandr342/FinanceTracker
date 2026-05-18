import { prisma } from "./../db/prisma";
import { createCatigories, createProduct, deleteCategory, updateCategory } from "shared";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const ProductRouter = router({
  createProduct: publicProcedure.input(createProduct).mutation(async ({ctx, input})=> {
    return ctx.prisma.product.create({data: input})
  }),
  getAllProduct: publicProcedure.query(async ({ctx})=>{
    return ctx.prisma.product.findMany({
        select:{
            id: true,
            name: true,
            barcode: true,
            unit: true,
            category: true,
            price: true,
        }
    })
  })
});