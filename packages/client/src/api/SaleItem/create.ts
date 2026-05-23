import { trpc } from "src/main";

export const useCreateSaleItem = () => {
  const utils = trpc.useUtils();
  return trpc.sale.createSaleItem.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.sale.getSaleItems.invalidate();
    },
    onError: () => {},
  });
};
