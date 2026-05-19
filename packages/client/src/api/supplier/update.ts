import { trpc } from "src/main";

export const useUpdateSupplier = () => {
  const utils = trpc.useUtils();
  return trpc.suppliers.updateSupplier.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.suppliers.getAllSupplieres.invalidate();
    },
    onError: () => {},
  });
};
