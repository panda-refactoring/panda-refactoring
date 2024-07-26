import { useQuery } from "react-query";
import { apiGet } from "../request";

export const useSearchProduct = ({ enteredWord }: { enteredWord: string }) => {
  return useQuery({
    queryKey: ["searchProduct", enteredWord],
    queryFn: async () => await apiGet.SEARCH(enteredWord),
    onError: ({ response }) => response.data,
    enabled: !!enteredWord,
  });
};
