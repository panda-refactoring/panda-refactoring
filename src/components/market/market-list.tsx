import { NextPage } from "next";

import MarketItem from "./market-item";

import { MainProductData } from "../../common/types/data.types";
import { MarketListProps } from "./types";
import Loading from "../common/ui/loading";

const MarketList: NextPage<MarketListProps> = ({ marketData, hasValue }) => {
  const marketList: MainProductData[] = hasValue && marketData ? marketData.slice().reverse() : [];

  return (
    <ul className="flex flex-col gap-3 px-5 pb-16">
      {!hasValue && <Loading />}
      {hasValue && marketList.length > 0 ? (
        marketList.map((product: MainProductData) => <MarketItem key={product.id} data={product} />)
      ) : (
        <p>상품이 존재하지 않습니다.</p>
      )}
    </ul>
  );
};

export default MarketList;
