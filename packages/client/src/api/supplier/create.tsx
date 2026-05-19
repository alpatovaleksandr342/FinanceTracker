import { trpc } from "src/main";

export const useCreateSupplier = () => {
  const utils = trpc.useUtils();
  return trpc.suppliers.createSupplier.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.suppliers.getAllSupplieres.invalidate();
    },
    onError: () => {},
  });
};
