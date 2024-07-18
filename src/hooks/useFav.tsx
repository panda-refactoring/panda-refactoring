import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { apiPost } from "../service/request";
import { ProductData } from "src/common/types/data.types";

interface Fav {
  id: number;
  productId: number;
  userId: number;
}

interface useFavProps {
  currentUserId: number;
  productData?: ProductData;
}

const useFav = ({ currentUserId, productData }: useFavProps) => {
  const [isFavActive, setIsFavActive] = useState<boolean>(false);
  const [favCount, setFavCount] = useState<number>(0);

  const updateFav = useCallback(
    async (favConfig: {
      currentUserId: number;
      lookId?: number;
      productId?: number;
    }) => {
      const { currentUserId, productId, lookId } = favConfig;
      const payload = productId ? { productId } : { lookId };

      const data = apiPost.UPDATE_USER(currentUserId, payload);
      return data;
    },
    [],
  );

  const { mutate } = useMutation(updateFav, {
    onSuccess: () => changeCount(),
    onError: ({ response }) => {
      console.log(response.data.message);
    },
  });

  const changeButtonSytle = () => {
    setIsFavActive(prev => !prev);
  };

  const changeCount = () => {
    isFavActive ? setFavCount(prev => prev - 1) : setFavCount(prev => prev + 1);
  };

  const updateFavCount = (count: number) => setFavCount(count);

  const toggleFavButton = () => {
    changeButtonSytle();
    mutate({
      currentUserId,
      productId: productData?.id,
    });
  };

  const initialButtonStyle = (fav: Fav[]) => {
    fav.forEach((item: { userId: number }) => {
      item.userId === currentUserId && setIsFavActive(true);
    });
  };

  useEffect(() => {
    if (!productData) return;
    const { fav } = productData;

    updateFavCount(fav.length);
    initialButtonStyle(fav);
  }, [productData]);

  return {
    isFavActive,
    favCount,
    toggleFavButton,
  };
};

export default useFav;
