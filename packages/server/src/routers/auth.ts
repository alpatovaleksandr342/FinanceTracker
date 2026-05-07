import { router, publicProcedure, protectedProcedure } from "../trpc";
export const authRouter = router({
  getTestData: publicProcedure.query(async () => {

    const data = {label:"Подпись",text:"РКН хуесосы",time:new Date()}
    return {data}
  }),
});
