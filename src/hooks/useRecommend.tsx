import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ProductData } from "../common/types/data.types";
import { random } from "../common/util/random";

interface IUseRecommend {
  keyword: string;
  productList: { [key: string]: ProductData[] };
}

const useRecommend = ({ keyword, productList }: IUseRecommend) => {
  const [recommendList, setRecommendList] = useState<ProductData[]>([]);

  const { status: session } = useSession();
  const isUnAuthenticatedUser = session === "unauthenticated";

  const setRecommendItems = (keywordItemList: {
    [key: string]: ProductData[];
  }) => {
    const randomItems: { [key: string]: ProductData[] } = {};

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
