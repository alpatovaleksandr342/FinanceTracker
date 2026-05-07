import { router, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { TRPCError } from "@trpc/server";
import { text } from "node:stream/consumers";
import { time } from "node:console";
export const authRouter = router({
  getTestData: publicProcedure.query(async () => {

    const data = {label:"Подпись",text:"РКН хуесосы",time:new Date()}
    return {data}
  }),
});
