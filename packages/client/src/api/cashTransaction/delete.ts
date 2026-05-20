import { trpc } from "src/main";

export const useDeleteTransaction = () => {
  const utils = trpc.useUtils();
  return trpc.cashTransaction.DeleteTransaction.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.cashTransaction.getAllTransaction.invalidate();
    },
    onError: () => {},
  });
};
