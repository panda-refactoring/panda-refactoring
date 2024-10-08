import { Icon } from "@iconify/react";
import { NextPage } from "next";

import { useRecoilState } from "recoil";
import { wordListState } from "../../recoil/filter";

const FilterList: NextPage = () => {
  const [wordList, setWordList] = useRecoilState(wordListState);

  const removeWord = (word: string) => {
    const newWordList = wordList.filter(item => item !== word);
    setWordList(newWordList);
  };

  const content =
    wordList.length > 0 ? (
      <ul className="flex flex-wrap gap-2 pt-[18px]">
        {wordList.map((item, i) => {
          const key = `${item}-${i}`;
          return (
            <li
              key={key}
              className="flex cursor-pointer items-center rounded-full bg-gray-200 px-3 py-2"
            >
              {item}
              <Icon
                icon="ic:baseline-clear"
                aria-label="검색어 삭제"
                onClick={() => removeWord(item)}
              />
            </li>
          );
        })}
      </ul>
    ) : null;

  return content;
};

export default FilterList;
