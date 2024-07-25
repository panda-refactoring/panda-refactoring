import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useState } from "react";
import { allKeywords } from "../../../common/consts/keywords";

const TagSelecotr: NextPage = () => {
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const onResetBtn = () => {
    setSelectedTag([]);
  };
  const allSelectedTag = allKeywords.value;

  const handleTagSelection = (data: string) => {
    setSelectedTag(prevTags => (prevTags.includes(data) ? prevTags.filter(tag => tag !== data) : [...prevTags, data]));
  };
  return (
    <div>
      <ul className="my-3 flex w-full flex-wrap gap-2 px-2">
        {allSelectedTag.map((ele, index) => {
          return (
            <div
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-solid border-black px-2 py-1 ${
                selectedTag.includes(ele) ? "bg-black text-white" : ""
              } `}
              key={index}
              onClick={() => handleTagSelection(ele)}
            >
              {ele}
            </div>
          );
        })}
        <button onClick={onResetBtn} className="px-2 text-2xl">
          <Icon icon="carbon:reset" />
        </button>
      </ul>
    </div>
  );
};

export default TagSelecotr;
