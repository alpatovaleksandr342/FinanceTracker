import { trpc } from "src/main";

export const useDeleteSession = () => {
  const utils = trpc.useUtils();

  return trpc.cashSession.deleteSession.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.cashSession.getAllSession.invalidate();
    },
    onError: () => {},
  });
};
