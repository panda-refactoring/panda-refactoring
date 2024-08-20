import ProductItem from "./product-item";
import EmptyProduct from "./empty-product";
import RecommendButton from "./ui/recommend-button";

import useRecommend from "../../hooks/useRecommend";
import { UserData } from "src/common/types/data.types";
import useKeyword from "src/hooks/useKeyword";

const RecommendList = ({ userData }: { userData?: UserData }) => {
  const { selectedKeyword, keywordItemList } = useKeyword({ userData });

  const { recommendList, setRecommendItems } = useRecommend({
    keyword: selectedKeyword,
    productList: keywordItemList,
  });

  const hasRecommendList = recommendList?.length > 0;

  const isVisibleRecommendButton = recommendList?.length > 0 && keywordItemList[selectedKeyword];

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
