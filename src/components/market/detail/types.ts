import { ProductData } from "src/common/types/data.types";

export interface TitleBoxProps {
  product: ProductData;
  isFavoriteActive: boolean;
  toggleFavorite: () => void;
}

export interface CategoryBoxProps {
  product: ProductData;
  favoriteCount: number;
}
