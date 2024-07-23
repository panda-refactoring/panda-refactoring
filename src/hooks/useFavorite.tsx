import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { apiPost } from "../service/request";
import { LookbookData, ProductData } from "src/common/types/data.types";

interface Favorite {
  id: number;
  productId: number;
  userId: number;
}

interface useFavoriteProps {
  currentUserId: number;
  productData?: ProductData;
  lookbookData?: LookbookData;
}

const useFavorite = ({ currentUserId, productData, lookbookData }: useFavoriteProps) => {
  const [isFavoriteActive, setIsFavoriteActive] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  const updateFavorite = useCallback(
    async (favoriteConfig: { currentUserId: number; lookId?: number; productId?: number }) => {
      const { currentUserId, productId, lookId } = favoriteConfig;
      const payload = productId ? { productId } : { lookId };

      const data = apiPost.UPDATE_USER(currentUserId, payload); // 행위는 같다. (end point가 같다.)
      return data;
    },
    [],
  );

  const { mutate } = useMutation(updateFavorite, {
    onSuccess: () => changeCount(),
    onError: ({ response }) => {
      console.log(response.data.message);
    },
  });

  const changeButtonSytle = () => {
    setIsFavoriteActive(prev => !prev);
  };

  const changeCount = () => {
    isFavoriteActive ? setFavoriteCount(prev => prev - 1) : setFavoriteCount(prev => prev + 1);
  };

  const updateFavoriteCount = (count: number) => setFavoriteCount(count);

  const toggleFavoriteButton = () => {
    changeButtonSytle();

    const id = productData ? "productId" : "lookId";
    mutate({
      currentUserId,
      [id]: productData?.id ?? lookbookData?.id,
    });
  };

  const initialButtonStyle = (favorite: Favorite[]) => {
    favorite.forEach((item: { userId: number }) => {
      item.userId === currentUserId && setIsFavoriteActive(true);
    });
  };

  useEffect(() => {
    if (!productData) return;
    const favorite = productData.favorite;

    updateFavoriteCount(favorite.length);
    initialButtonStyle(favorite);
  }, [productData]);

  useEffect(() => {
    if (!lookbookData) return;
    const favorite = lookbookData.favorite;

    updateFavoriteCount(favorite.length);
    initialButtonStyle(favorite);
  }, [lookbookData]);

  return {
    isFavoriteActive,
    favoriteCount,
    toggleFavoriteButton,
  };
};

export default useFavorite;
