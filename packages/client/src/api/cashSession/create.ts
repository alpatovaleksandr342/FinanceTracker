import { trpc } from "src/main";

export const useCreateSession = () => {
  const utils = trpc.useUtils();
  return trpc.cashSession.createSession.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.cashSession.getAllSession.invalidate();
    },
    onError: () => {},
  });
};
