import { trpc } from "src/main";



export const useDeleteCategory = () => {

const utils = trpc.useUtils();

  return trpc.categoties.deleteCategory.useMutation({
    
    onMutate:()=>{

    },
    onSuccess: () => {
        utils.categoties.getAllCategoryes.invalidate()
    },
    onError: () => {
        
    }
  })
}
