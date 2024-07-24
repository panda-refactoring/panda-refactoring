import { useEffect, useState } from "react";

interface Favorite {
  id: number;
  productId: number;
  userId: number;
}

interface useFavoriteProps {
  currentUserId: number;
  favorite: {
    id: number;
    productId: number;
    userId: number;
  }[];
}

const useFavorite = ({ currentUserId, favorite }: useFavoriteProps) => {
  const [isFavoriteActive, setIsFavoriteActive] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(favorite?.length);

  const changeButtonSytle = () => {
    setIsFavoriteActive(prev => !prev);
  };

  const changeCount = () => {
    isFavoriteActive ? setFavoriteCount(prev => prev - 1) : setFavoriteCount(prev => prev + 1);
  };

  const updateFavorite = () => {
    changeCount();
    changeButtonSytle();
  };

  const initialButtonStyle = (favorite: Favorite[]) => {
    favorite.forEach((item: { userId: number }) => {
      item.userId === currentUserId && setIsFavoriteActive(true);
    });
  };

  useEffect(() => {
    if (!favorite) return;

    initialButtonStyle(favorite);
  }, [favorite]);

  return {
    isFavoriteActive,
    favoriteCount,
    updateFavorite,
  };
};

export default useFavorite;
