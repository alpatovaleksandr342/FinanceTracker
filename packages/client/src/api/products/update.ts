import { trpc } from "src/main";

export const useUpdateProduct = () => {
  const utils = trpc.useUtils();
  return trpc.products.updateProduct.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.products.getAllProduct.invalidate();
    },
    onError: () => {},
  });
};
