import { NextPage } from "next";

import ProductItem from "./product-item";
import EmptyProduct from "./empty-product";
import RecommendButton from "./ui/recommend-button";

import useRecommend from "../../hooks/useRecommend";
import { RecommendListProps } from "./types";

const RecommendList: NextPage<RecommendListProps> = ({
  selectedKeyword,
  keywordItemList,
}) => {
  const { recommendList, setRecommendItems } = useRecommend({
    keyword: selectedKeyword,
    productList: keywordItemList,
  });

  const hasRecommendList = recommendList?.length > 0;

  const isVisibleRecommendButton =
    recommendList?.length > 0 && keywordItemList[selectedKeyword];

  return (
    <>
      {hasRecommendList ? (
        <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
          {recommendList?.map(data => (
            <ProductItem {...data} key={data.id} imgh="h-[190px]" />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[540px] items-center justify-center text-center">
          <EmptyProduct />
        </div>
      )}
      {isVisibleRecommendButton && (
        <RecommendButton
          refreshRecommends={setRecommendItems}
          keywordItemList={keywordItemList}
          keyword={selectedKeyword}
        />
      )}
    </>
  );
};

export default RecommendList;
