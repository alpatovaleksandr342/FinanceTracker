import { trpc } from "src/main";

export const useUpdateTransaction = () => {
  const utils = trpc.useUtils();
  return trpc.cashTransaction.UpdateTransaction.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.cashTransaction.getAllTransaction.invalidate();
    },
    onError: () => {},
  });
};
