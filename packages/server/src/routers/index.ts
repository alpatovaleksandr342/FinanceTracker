import { router } from '../trpc';
import { authRouter } from './auth';
import { cashSessionRouter } from './cashSession';
import { cashTransactionRouter } from './cashTransaction';
import { categotiesRouter } from './categories';
import { ProductRouter } from './products';
import { purchaseRouter } from './purchase';
import { supplierRouter } from './supplier';
export const appRouter = router({
  auth: authRouter,
  categoties: categotiesRouter,
  products: ProductRouter,
  cashSession: cashSessionRouter,
  suppliers: supplierRouter,
  purchase: purchaseRouter,
  cashTransaction: cashTransactionRouter,
});

export type AppRouter = typeof appRouter;
