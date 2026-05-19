import { trpc } from "src/main";

export const useUpdateSession = () => {
  const utils = trpc.useUtils();
  return trpc.cashSession.updateSession.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.cashSession.getAllSession.invalidate();
    },
    onError: () => {},
  });
};
