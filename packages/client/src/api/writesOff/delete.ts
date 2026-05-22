import { trpc } from "src/main";

export const useDeleteWriteOff = () => {
  const utils = trpc.useUtils();
  return trpc.writeOff.deleteWriteOff.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.writeOff.getWriteOff.invalidate();
    },
    onError: () => {},
  });
};
