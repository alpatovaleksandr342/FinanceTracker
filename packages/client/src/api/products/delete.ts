import { trpc } from "src/main";

export const useDeleteProduct = () => {
  const utils = trpc.useUtils();

  return trpc.products.deleteProduct.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.products.getAllProduct.invalidate();
    },
    onError: () => {},
  });
};
