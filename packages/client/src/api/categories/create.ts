import { trpc } from "src/main";



export const useCreateCategory = () => {
  return trpc.categoties.createCategori.useMutation({
    onMutate:()=>{
    },
    onSuccess: () => {},
    onError: () => {}
  })
}
