import { NextPage } from "next";

import { cls } from "../../common/util/class";
import { KeywordsProps } from "./types";

const Keyword: NextPage<KeywordsProps> = props => {
  const { userKeyword, selectedKeyword, onClickKeyword } = props;

  const clickKeyword = (tagName: string) => {
    onClickKeyword(tagName);
  };

  return (
    <div className="relative h-9 min-w-[65px] rounded-lg px-3">
      <button
        type="button"
        className={cls(
          "absolute left-0 top-0 z-10 h-full w-full rounded-lg border border-common-black",
          selectedKeyword === userKeyword
            ? "border-common-black bg-common-black text-white"
            : "border-common-black bg-white",
        )}
        onClick={() => clickKeyword(userKeyword)}
      >
        {userKeyword}
      </button>
      <span className="absolute left-[2px] top-[2px] h-full w-full rounded-lg bg-common-black" />
    </div>
  );
};

export default Keyword;
