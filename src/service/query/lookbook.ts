import { useInfiniteQuery, useQuery } from "react-query";
import { LookbookData } from "src/common/types/data.types";
import { apiGet, apiPost } from "../request";

const BASE_LOOKBOOK_KEY = "lookbook";

const LOOKBOOK_KEY = {
  LIST: [BASE_LOOKBOOK_KEY, "list"],
};

export const useGetLookBookPost = ({ lookbookId }: { lookbookId: string }) => {
  return useQuery<LookbookData>(BASE_LOOKBOOK_KEY, () => apiGet.GET_POST(lookbookId), {
    enabled: !!lookbookId,
    notifyOnChangeProps: "tracked",
  });
};

export const useGetLookBookList = ({ lookbookId }: { lookbookId: string }) => {
  return useInfiniteQuery(LOOKBOOK_KEY.LIST, ({ pageParam = 1 }) => apiPost.GET_ALL_POST(lookbookId, pageParam), {
    getNextPageParam: lastPage => lastPage?.nextId ?? false,
    enabled: !!lookbookId,
    notifyOnChangeProps: "tracked",
  });
};
