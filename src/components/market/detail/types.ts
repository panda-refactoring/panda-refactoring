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

export interface Images {
  id: number;
  img: string;
  productId?: number;
  imgH?: string;
  propH?: number;
}

export interface ImageSlideProps {
  images: Images[];
  isLoading?: boolean;
  imgH?: string;
  propH?: number;
  slideTime?: number;
}
