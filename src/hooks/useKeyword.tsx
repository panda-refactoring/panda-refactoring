import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

import { apiGet } from "../service/request";
import { ProductData, UserData } from "../common/types/data.types";
import { KeywordItemList } from "src/components/main/types";

const useKeyword = ({ userData }: { userData?: UserData }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [keywordItemList, setKeywordItemList] = useState<KeywordItemList>({});

  const { status: session } = useSession();
  const isUnAuthenticatedUser = session === "unauthenticated";

  const { data: products, status } = useQuery<ProductData[]>({
    queryKey: ["products"],
    queryFn: apiGet.GET_ITEMS,
    enabled: !!userData,
  });

  const setKeyword = (tagName: string) => setSelectedKeyword(tagName);

  const setKeywordItems = (
    keywords: { id: number; tag: string }[],
    products: ProductData[],
  ) => {
    if (keywords.length === 0) return;

    const keywordItems: KeywordItemList = {};

    const mappingItems = (tag: string) => {
      return products.filter(product => product.style === tag);
    };

    keywords.forEach(({ tag }) => {
      keywordItems[tag] = mappingItems(tag);
    });

    setKeywordItemList(keywordItems);
  };

  useEffect(() => {
    if (status !== "success") return;

    if (userData) {
      setKeyword(userData.keywords[0]?.tag);
      setKeywordItems(userData.keywords, products);
      return;
    }

    if (isUnAuthenticatedUser) {
      setKeyword("추천아이템");
      setKeywordItemList({ 추천아이템: products as ProductData[] });
    }
  }, [status, userData, session]);

  return {
    selectedKeyword,
    keywordItemList,
    setKeyword,
  };
};

export default useKeyword;
