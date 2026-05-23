import { trpc } from "src/main";

export const useDeleteSaleItem = () => {
  const utils = trpc.useUtils();
  return trpc.sale.deleteSaleItem.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.sale.getSaleItems.invalidate();
    },
    onError: () => {},
  });
};
