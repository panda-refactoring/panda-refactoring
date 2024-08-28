import { NextPage } from "next";

import RecommendList from "./recommend-list";
import Keyword from "./keyword";
import LoadingFallback from "./ui/loading-fallback";

import NextSuspense from "../../pages/suspense";
import useKeyword from "../../hooks/useKeyword";
import { UserData } from "../../common/types/data.types";

const Recommend: NextPage<{ userData?: UserData }> = ({ userData }) => {
  const { selectedKeyword, setKeyword } = useKeyword({ userData });

  return (
    <div className="space-y-5 px-5">
      <div>
        <h2 className="text-xl">Style for You</h2>
        <p className="mt-1 text-textColor-gray-100">
          {userData ? `${userData.nickname}님의 키워드에 적합한 아이템` : "지금 핫한 아이템"}
        </p>
      </div>
      <>
        {userData && (
          <div className="flex h-11 w-full items-center gap-2 overflow-hidden overflow-x-scroll font-bold text-common-gray scrollbar-hide">
            {userData.keywords?.map(({ tag, id }: { tag: string; id: number }) => (
              <Keyword key={id} userKeyword={tag} selectedKeyword={selectedKeyword} onClickKeyword={setKeyword} />
            ))}
          </div>
        )}
        <NextSuspense fallback={<LoadingFallback />}>
          <RecommendList userData={userData} />
        </NextSuspense>
      </>
    </div>
  );
};

export default Recommend;
