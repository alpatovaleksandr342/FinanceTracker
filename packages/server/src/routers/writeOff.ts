
import { get } from "node:http";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const writeOffRouter = router({
    getWriteOff: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.writeOff.findMany({
            select: {
                id: true,
                quantity: true,
                date: true,
                reason: true,
                product: { select: { name: true } },
            }
        });
    })
});
