import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Icon } from "@iconify/react";

import Header from "../../components/common/header";
import ProductItem from "../../components/main/product-item";
import Toast from "src/components/common/ui/toast";
import SearchWords from "src/components/search/search-words";

import useToast from "../../hooks/useToast";
import useRecentWord from "src/hooks/useRecentWord";
import { ProductDataMin } from "../../common/types/data.types";
import { useSearchProduct } from "src/service/query/search";

const Search: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchData, setSearchData] = useState<ProductDataMin[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const router = useRouter();

  const enteredWord = router.query.word as string;

  const { setToast, showToast, toastController } = useToast();

  const { recentWords, setRecentWords } = useRecentWord();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
  };

  const searchKeyword = (keyword: string) => {
    router.push({
      pathname: router.pathname,
      query: { word: keyword },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;

    searchKeyword(inputValue);
  };

  const reset = () => {
    setInputValue("");
    setSearchData([]);
    setIsSearch(false);
    router.push({
      pathname: router.pathname,
    });
  };

  const { data, error, refetch, isSuccess, isError } = useSearchProduct({ enteredWord });

  useEffect(() => {
    if (isError) setToast({ message: error?.response?.data, isError: true });
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setSearchData(data);
      setIsSearch(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!enteredWord) return;

    setInputValue(enteredWord);
    refetch();
  }, [enteredWord]);

  return (
    <>
      <Header text="SEARCH" goBack goHome />
      {showToast && <Toast {...toastController} />}
      <div className="px-5 py-5">
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={inputValue || ""}
            onChange={handleInputChange}
            className="h-12 w-full border-b border-common-black py-2 pl-[10px] pr-10"
          />
          <Icon
            icon="mdi:close-circle-outline"
            className="absolute right-3 cursor-pointer text-xl text-textColor-gray-100"
            onClick={reset}
          />
        </form>
        <div>
          {isSearch ? (
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {searchData.length > 0 ? (
                searchData.map(data => <ProductItem key={data.id} {...data} imgw="w-full" imgh="h-[190px]" />)
              ) : (
                <li>검색결과가 없습니다</li>
              )}
            </ul>
          ) : (
            <SearchWords enteredWord={enteredWord} recentWords={recentWords} setRecentWords={setRecentWords} />
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
