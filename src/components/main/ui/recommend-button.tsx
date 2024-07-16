import { Icon } from "@iconify/react";
import { NextPage } from "next";

import { RecommendButtonProps } from "../types";

const RecommendButton: NextPage<RecommendButtonProps> = ({
  refreshRecommends,
  keywordItemList,
  keyword,
}) => {
  return (
    <div className="relative h-10">
      <button
        className="absolute left-0 top-0 z-10 flex h-10 w-full items-center justify-center border border-black bg-white"
        onClick={() => refreshRecommends(keywordItemList)}
      >
        <Icon icon="ic:baseline-refresh" className="-mt-1 mr-1 text-lg" />
        {keyword === "추천아이템" ? "추천 아이템" : `${keyword} 아이템`}
      </button>
      <span className="absolute left-1 top-1 h-full w-full bg-common-black" />
      <span className="absolute -right-[4px] top-[2px] h-[3px] w-[6px] rotate-45 bg-common-black" />
      <span className="absolute -bottom-[2px] left-0 h-[3px] w-[6px] rotate-45 bg-common-black" />
    </div>
  );
};

export default RecommendButton;
