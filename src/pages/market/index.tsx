import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { useRecoilValueLoadable } from "recoil";
import { filteredMarketListState } from "../../recoil/filter";

import Modal from "src/components/common/ui/modal";
import Header from "../../components/common/header";
import Navigation from "../../components/common/navigation";
import FloatingButton from "../../components/common/ui/floating-button";
import CategoryNavigation from "../../components/market/category-nav";
import FilterOverlay from "../../components/market/filter/market-filter";
import RentButtons from "../../components/market/rent-buttons";
import FilterList from "../../components/market/filter-list";
import MarketList from "../../components/market/market-list";

import { cls } from "../../common/util/class";

const Market: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  const { state, contents: filteredList } = useRecoilValueLoadable(filteredMarketListState);

  const openFilterOverlay = () => setFilterOpen(true);

  const closeFilterOverlay = () => setFilterOpen(false);

  useEffect(() => {
    if (state === "hasValue") setIsLoading(false);
  }, [state]);

  return (
    <div>
      {isFilterOpen && (
        <div
          className={cls(
            "fixed z-50 h-screen w-[390px] bg-white",
            `${isFilterOpen ? "translate-x-0" : "translate-x-[390px]"}`,
          )}
        >
          <FilterOverlay closeOverlay={closeFilterOverlay} />
        </div>
      )}
      <Header />
      <Modal />
      <CategoryNavigation />
      <div>
        <div className="mb-3 px-5 py-4">
          <div className="flex items-center justify-between">
            <RentButtons />
            <div className="relative h-8 w-8 transition duration-150 hover:scale-105">
              <Icon
                icon="akar-icons:settings-horizontal"
                aria-label="옵션 필터링 목록"
                className="absolute z-10 h-7 w-7 cursor-pointer rounded-md border border-common-black bg-white p-1 text-xl transition duration-150 hover:bg-primary-green"
                onClick={openFilterOverlay}
              />
              <span className="absolute left-[2px] top-[2px] h-7 w-7 rounded-md bg-common-black" />
            </div>
          </div>
          <FilterList />
        </div>
      </div>
      <MarketList marketData={filteredList} isLoading={isLoading} />
      <Navigation />
      <FloatingButton path="/create/market" />
    </div>
  );
};

export default Market;
