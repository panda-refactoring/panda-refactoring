import { ProductData, ProductDataMin } from "src/common/types/data.types";

export interface KeywordsProps {
  userKeyword: string;
  selectedKeyword: string;
  onClickKeyword: (tagName: string) => void;
}

export interface KeywordItemList {
  [key: string]: ProductData[];
}

export interface RecommendListProps {
  selectedKeyword: string;
  keywordItemList: KeywordItemList;
}

export interface RecommendButtonProps {
  refreshRecommends: (keywordItemList: KeywordItemList) => void;
  keywordItemList: KeywordItemList;
  keyword: string;
}

export interface ProductItemProps extends ProductDataMin {
  imgw?: string;
  imgh?: string;
}
