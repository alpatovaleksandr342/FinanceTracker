import { trpc } from "src/main";

export const useUpdateCategory = () => {
  const utils = trpc.useUtils();
  return trpc.categoties.updateCategory.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.categoties.getAllCategoryes.invalidate();
    },
    onError: () => {},
  });
};
