import { router } from '../trpc';
import { authRouter } from './auth';
import { categotiesRouter } from './categories';
import { ProductRouter } from './products';
import { supplierRouter } from './supplier';
export const appRouter = router({
  auth: authRouter,
  categoties: categotiesRouter,
  products: ProductRouter,
  suppliers: supplierRouter
});

export type AppRouter = typeof appRouter;
