import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "../db/prisma";
import { verifyToken } from "../utils/jwt";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  let worker = null;
  if (token) {
    const payload = verifyToken(token);
  }

  return { req, res, prisma, worker };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
