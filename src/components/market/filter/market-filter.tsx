import { NextPage } from "next";
import { useState } from "react";

import { Icon } from "@iconify/react";
import { useSetRecoilState } from "recoil";
import { wordListState } from "../../../recoil/filter";

import Button from "../../common/ui/button";
import FilterTab from "./filter-tab";

import { priceList } from "../../../common/consts/price";
import { tabData } from "src/common/consts/market";

const FilterOverlay: NextPage<{
  closeOverlay: () => void;
}> = ({ closeOverlay }) => {
  const [isOpen, setIsOpen] = useState<string | null>("STYLE");
  const [filterWords, setFilterWords] = useState<string[]>([]);

  const setWordList = useSetRecoilState(wordListState);

  const openTab = (event: React.MouseEvent<HTMLDivElement>) => {
    const { textContent } = event.target as HTMLDivElement;
    setIsOpen(textContent);
  };

  const updateTemporaryList = (word: string) => {
    if (filterWords.includes(word))
      setFilterWords(prev => prev.filter(item => item !== word));
    else setFilterWords(prev => [...prev, word]);
  };

  const updateFilterList = () => {
    setWordList(filterWords);
    closeOverlay();
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex h-[60px] items-center border-b border-common-black bg-white px-3">
        <button type="button" className="text-2xl">
          <Icon
            icon="ic:baseline-arrow-forward-ios"
            aria-label="뒤로가기"
            onClick={closeOverlay}
          />
        </button>
      </div>
      <div>
        <FilterTab
          name="STYLE"
          tabData={tabData.style.slice(0, 20)}
          wordList={filterWords}
          isOpen={isOpen}
          addWords={updateTemporaryList}
          onClick={openTab}
        />
        <FilterTab
          name="PRICE"
          tabData={priceList}
          wordList={filterWords}
          isOpen={isOpen}
          addWords={updateTemporaryList}
          onClick={openTab}
        />
        <Button
          type="button"
          text="검색"
          classes="bg-black"
          btnWrapClasses="p-5"
          fontColor="text-white"
          position="absolute bottom-2"
          onClick={updateFilterList}
        />
      </div>
    </>
  );
};

export default FilterOverlay;
