import { useMutation } from "react-query";
import { MarketPayload, StyleFeedPayload } from "./create.types";
import { apiPost } from "../request";

const BASE_CREATE_KEY = "create";

const CREATE_KEY = {
  MARKET: [BASE_CREATE_KEY, "market"],
  STYLE_FEED: [BASE_CREATE_KEY, "style-feed"],
};

export const useCreateMarket = () => {
  return useMutation({
    mutationKey: CREATE_KEY.MARKET,
    mutationFn: async (payload: MarketPayload) =>
      await apiPost.CREATE_ITEM(payload),
  });
};

export const useCreateStyleFeed = () => {
  return useMutation({
    mutationKey: CREATE_KEY.STYLE_FEED,
    mutationFn: async (payload: StyleFeedPayload) =>
      await apiPost.CREATE_POST(payload),
  });
};
