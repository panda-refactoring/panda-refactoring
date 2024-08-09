import { useQuery } from "react-query";
import { apiGet } from "../request";
import { useEffect } from "react";

export const useGetProduct = ({ productId }: { productId: string }) => {
  const getProductQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => await apiGet.GET_ITEM(productId),
    enabled: !!productId,
  });

  const { error } = getProductQuery;

  useEffect(() => {
    if (error) {
      throw "AxiosError";
    }
  }, [error]);

  return getProductQuery;
};
