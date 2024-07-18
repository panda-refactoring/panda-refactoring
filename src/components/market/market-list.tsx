import { NextPage } from "next";
import { useEffect, useState } from "react";

import MarketItem from "./market-item";
import LoadingSpinner from "../common/ui/loading-spinner";

import { MainProductData } from "../../common/types/data.types";
import { MarketListProps } from "./types";

const MarketList: NextPage<MarketListProps> = ({ marketData, isLoading }) => {
  const [marketList, setMarketList] = useState<MainProductData[]>([]);

  useEffect(() => {
    if (isLoading) return;

    const copiedData = marketData.slice();
    setMarketList(copiedData.reverse());
  }, [marketData, isLoading]);

  return (
    <ul className="flex flex-col gap-3 px-5 pb-16">
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading &&
        (marketList.length > 0 ? (
          marketList.map((product: MainProductData) => (
            <MarketItem key={product.id} data={product} />
          ))
        ) : (
          <p>상품이 존재하지 않습니다</p>
        ))}
    </ul>
  );
};

export default MarketList;
