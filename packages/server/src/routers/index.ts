import { router } from '../trpc';
import { authRouter } from './auth';
import { cashSessionRouter } from './cashSession';
import { categotiesRouter } from './categories';
import { ProductRouter } from './products';
export const appRouter = router({
  auth: authRouter,
  categoties: categotiesRouter,
  products: ProductRouter,
  cashSession: cashSessionRouter
});

export type AppRouter = typeof appRouter;
