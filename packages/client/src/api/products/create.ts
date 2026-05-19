import { trpc } from "src/main";

export const useCreateProduct = () => {
  const utils = trpc.useUtils();
  return trpc.products.createProduct.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.products.getAllProduct.invalidate();
    },
    onError: () => {},
  });
};
