import { router } from '../trpc';
import { authRouter } from './auth';
import { categotiesRouter } from './categories';
import { ProductRouter } from './products';
export const appRouter = router({
  auth: authRouter,
  categoties: categotiesRouter,
  products: ProductRouter
});

export type AppRouter = typeof appRouter;
