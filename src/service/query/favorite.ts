import { useMutation } from "react-query";
import useToast from "src/hooks/useToast";
import { apiPost } from "../request";
import { FavoriteConfig } from "./favorite.types";

const BASE_FAVORITE_KEY = "favorite";

const FAVORITE_KEY = {
  PRODUCT: [BASE_FAVORITE_KEY, "product"],
  LOOKBOOK: [BASE_FAVORITE_KEY, "lookbook"],
};

export const useUpdateProductFavorite = () => {
  const { setToast } = useToast();

  return useMutation({
    mutationKey: FAVORITE_KEY.PRODUCT,
    mutationFn: (favoriteConfig: FavoriteConfig) => {
      const { currentUserId, productId } = favoriteConfig;
      const data = apiPost.UPDATE_USER(currentUserId, { productId: productId ?? 0 });

      return data;
    },
    onError: ({ response }) => {
      setToast({ message: response.data.message, isError: true });
    },
  });
};

export const useUpdateLookbookFavorite = () => {
  const { setToast } = useToast();

  return useMutation({
    mutationKey: FAVORITE_KEY.LOOKBOOK,
    mutationFn: (favoriteConfig: FavoriteConfig) => {
      const { currentUserId, lookId } = favoriteConfig;
      const data = apiPost.UPDATE_USER(currentUserId, { lookId: lookId ?? 0 });

      return data;
    },
    onError: ({ response }) => {
      setToast({ message: response.data.message, isError: true });
    },
  });
};

// const { mutate } = useMutation(updateFavorite, {
//   onSuccess: () => updateStyle(),
//   onError: ({ response }) => {
//     console.log(response.data.message);
//   },
// });
