import { CreateState, Options } from "src/common/types/create.types";

export interface MarketPayload {
  data: CreateState;
  imageUrlList: string[];
  options: Options;
}

export interface StyleFeedPayload {
  data: CreateState;
  imageUrlList: string[];
  tagIdList: number[];
}
