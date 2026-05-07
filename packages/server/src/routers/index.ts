import { router } from '../trpc';
import { authRouter } from './auth';
import { categotiesRouter } from './categories';
export const appRouter = router({
  auth: authRouter,
  categoties: categotiesRouter,
});

export type AppRouter = typeof appRouter;
