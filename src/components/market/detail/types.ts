import { ProductData } from "src/common/types/data.types";

export interface TitleBoxProps {
  product: ProductData;
  isFavActive: boolean;
  toggleFav: () => void;
}

export interface CategoryBoxProps {
  product: ProductData;
  favCount: number;
}
