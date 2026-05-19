import { trpc } from "src/main";

export const useDeletePurchase = () => {
  const utils = trpc.useUtils();

  return trpc.purchase.purchaseDelete.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.purchase.getAllPurchase.invalidate();
    },
    onError: () => {},
  });
};
