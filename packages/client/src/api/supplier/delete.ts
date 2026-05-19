import { trpc } from "src/main";

export const useDeleteSupplier = () => {
  const utils = trpc.useUtils();

  return trpc.suppliers.deleteSupplier.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.suppliers.getAllSupplieres.invalidate();
    },
    onError: () => {},
  });
};
