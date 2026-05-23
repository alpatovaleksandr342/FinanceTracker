import { write } from 'node:fs';
import { router } from '../trpc';
import { authRouter } from './auth';
import { cashSessionRouter } from './cashSession';
import { cashTransactionRouter } from './cashTransaction';
import { categotiesRouter } from './categories';
import { inventoryBatchRouter } from './invintoryBatch';
import { ProductRouter } from './products';
import { purchaseRouter } from './purchase';
import { supplierRouter } from './supplier';
import { writeOffRouter } from './writeOff';
import { saleItemRouter } from './saleItem';
export const appRouter = router({
  auth: authRouter,
  categoties: categotiesRouter,
  products: ProductRouter,
  cashSession: cashSessionRouter,
  suppliers: supplierRouter,
  purchase: purchaseRouter,
  cashTransaction: cashTransactionRouter,
  inventoryBatch: inventoryBatchRouter,
  writeOff: writeOffRouter,
  sale: saleItemRouter,
});

export type AppRouter = typeof appRouter;
