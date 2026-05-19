import { trpc } from "src/main";

export const useCreatePurchase = () => {
  const utils = trpc.useUtils();
  return trpc.purchase.createPurchase.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.purchase.getAllPurchase.invalidate();
    },
    onError: () => {},
  });
};
