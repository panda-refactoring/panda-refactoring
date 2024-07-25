import { cls } from "src/common/util/class";
import { KeywordProps } from "./types";

const Keyword = ({ keyword, selectedKeywords, onSetKeywords }: KeywordProps) => {
  const handleSelection = () => {
    onSetKeywords(keyword);
  };

  return (
    <li
      className={cls(
        "flex cursor-pointer items-center gap-3 rounded-full border-2 px-2 py-1",
        selectedKeywords.includes(keyword) ? "border-primary-violet bg-white" : "border-white bg-borderColor-gray",
      )}
      onClick={handleSelection}
    >
      {keyword}
    </li>
  );
};

export default Keyword;
