import { trpc } from "src/main";

export const useCreateWriteOff = () => {
  const utils = trpc.useUtils();
  return trpc.writeOff.createWriteOff.useMutation({
    onMutate: () => {},
    onSuccess: () => {
      utils.writeOff.getWriteOff.invalidate();
    },
    onError: () => {},
  });
};
