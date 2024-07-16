import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ProductData } from "../common/types/data.types";
import { random } from "../common/util/random";
import { KeywordItemList } from "src/components/main/types";

interface IUseRecommend {
  keyword: string;
  productList: KeywordItemList;
}

const useRecommend = ({ keyword, productList }: IUseRecommend) => {
  const [recommendList, setRecommendList] = useState<ProductData[]>([]);

  const { status: session } = useSession();
  const isUnAuthenticatedUser = session === "unauthenticated";

  const setRecommendItems = (keywordItemList: KeywordItemList) => {
    const randomItems: KeywordItemList = {};

    Object.entries(keywordItemList).forEach(([key, value]) => {
      randomItems[key] = random(value);
    });

    if (isUnAuthenticatedUser) {
      setRecommendList(randomItems["추천아이템"]);
      return;
    }

    setRecommendList(randomItems[keyword]);
  };

  useEffect(() => {
    if (!keyword) return;

    setRecommendItems(productList);
  }, [keyword, productList]);

  return { recommendList, setRecommendItems };
};

export default useRecommend;
