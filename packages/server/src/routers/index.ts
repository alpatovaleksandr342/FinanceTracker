import { router } from '../trpc';
import { authRouter } from './auth';
import { cashSessionRouter } from './cashSession';
import { categotiesRouter } from './categories';
import { ProductRouter } from './products';
import { supplierRouter } from './supplier';
export const appRouter = router({
  auth: authRouter,
  categoties: categotiesRouter,
  products: ProductRouter,
  cashSession: cashSessionRouter,
  suppliers: supplierRouter
});

export type AppRouter = typeof appRouter;
