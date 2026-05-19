import { trpc } from "src/main";

export const useUpdatePurchase = () => {
  const utils = trpc.useUtils();
  return trpc.purchase.purchaseUpdate.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.purchase.getAllPurchase.invalidate();
    },
    onError: () => {},
  });
};
