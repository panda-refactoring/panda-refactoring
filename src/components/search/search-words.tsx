import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";

import { recommendForSearch } from "src/common/consts/recommend-word";
import { SearchWordsProps } from "./types";

const SearchWords = ({ enteredWord, recentWords, setRecentWords }: SearchWordsProps) => {
  const router = useRouter();

  const session = useSession();

  const AUTHENTICATED = session.status === "authenticated";

  const recentWordList = [...new Set(recentWords)].slice(0, 10);

  const searchKeyword = (keyword: string) => () => {
    router.push({
      pathname: router.pathname,
      query: { word: keyword },
    });
  };

  const removeRecentWord = (word: string) => () => {
    setRecentWords(prevWords => prevWords.filter(recent => recent !== word));
  };

  useEffect(() => {
    if (!enteredWord) return;

    setRecentWords([enteredWord, ...recentWords]);
  }, [enteredWord]);

  return (
    <>
      <div className="mt-6">
        <h2 className="mb-5 text-base font-bold">추천 검색어</h2>
        <ul className="flex cursor-pointer flex-wrap gap-5 py-1 text-3xl">
          {recommendForSearch.map(word => (
            <li key={word}>#{word}</li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h2 className="mb-3 text-base font-bold">최근 검색어</h2>
        {AUTHENTICATED && (
          <ul className="cursor-pointer space-y-2 text-lg text-textColor-gray-50">
            {recentWordList.map((word, index) => (
              <li className="flex items-center justify-between" key={word}>
                <span onClick={searchKeyword(word)} className=" w-full text-common-black">
                  {word}
                </span>
                <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" onClick={removeRecentWord(word)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchWords;
