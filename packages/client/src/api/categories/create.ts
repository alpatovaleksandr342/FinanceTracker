import { trpc } from "src/main";

export const useCreateCategory = () => {
  const utils = trpc.useUtils();
  return trpc.categoties.createCategori.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.categoties.getAllCategoryes.invalidate();
    },
    onError: () => {},
  });
};
