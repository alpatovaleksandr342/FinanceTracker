import { trpc } from "src/main";

export const useCreateTransaction = () => {
  const utils = trpc.useUtils();
  return trpc.cashTransaction.CreateTransaction.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.cashTransaction.getAllTransaction.invalidate();
    },
    onError: () => {},
  });
};
