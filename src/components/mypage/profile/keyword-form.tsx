import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";

import Button from "src/components/common/ui/button";
import Overlay from "src/components/common/overlay";
import Keyword from "./keyword";

import { allKeywords } from "src/common/consts/keywords";
import { ProfileFormProps } from "./types";
import { useUpdateUserKeywords } from "src/service/query/profile";

const KeywordForm = ({ userData, setToast }: ProfileFormProps) => {
  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const { mutate, data, error, isSuccess, isError, isLoading } = useUpdateUserKeywords({ userId: userData?.id });

  const handleKeywordSelection = (data: string) => {
    setSelectedKeywords(prev => (prev.includes(data) ? prev.filter(tag => tag !== data) : [...prev, data]));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(selectedKeywords);
  };

  const resetKeywords = () => {
    setSelectedKeywords(userData?.keywords?.map(({ tag }: { tag: string }) => tag));
  };

  useEffect(() => {
    if (isSuccess) {
      setToast({ message: data });
      setIsTabOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) setToast({ message: error.response.message, isError: true });
  }, [isError]);

  useEffect(() => {
    if (userData) resetKeywords();
  }, [userData]);

  return (
    <>
      {isTabOpen && (
        <>
          <div className="fixed top-0 z-40 h-screen w-[390px] translate-x-[-20px] bg-black pt-10 opacity-40" />
          <div className="fixed bottom-0 z-50 w-[390px] translate-x-[-20px]">
            <form
              onSubmit={handleSubmit}
              className="h-16 w-full justify-center border-b-[1px] border-solid border-black bg-white p-5 text-center shadow-2xl shadow-black "
            >
              <span className="text-base font-bold">키워드 선택</span>
              <Icon
                type="button"
                icon="carbon:close"
                className="absolute right-4 top-4 z-50 h-7 w-7 cursor-pointer"
                onClick={() => {
                  setIsTabOpen(false), setSelectedKeywords(userData.keywords.map(({ tag }: { tag: string }) => tag));
                }}
              />
              <button type="submit" className="absolute bottom-5 right-5 z-50 cursor-pointer font-bold">
                완료
              </button>
            </form>
            <div className="h-[390px] w-full bg-white p-5 pt-0">
              <p className="pl-3 pt-5 text-xs text-textColor-gray-100">키워드를 선택해 주세요.</p>
              <ul className="flex w-full flex-wrap gap-2 px-2 py-3">
                {allKeywords.value.map(keyword => (
                  <Keyword
                    key={keyword}
                    keyword={keyword}
                    selectedKeywords={selectedKeywords}
                    onSetKeywords={handleKeywordSelection}
                  />
                ))}
                <button onClick={resetKeywords} className="px-2 text-2xl">
                  <Icon icon="carbon:reset" />
                </button>
              </ul>
            </div>
          </div>
        </>
      )}
      <p className="mt-5 px-2 text-sm text-black">키워드</p>
      <form>
        <div className="my-2 flex w-full justify-between px-3">
          <div className="flex w-full items-center whitespace-nowrap border-b-[1px] border-solid border-black  text-textColor-gray-100">
            {userData?.keywords?.map(({ tag }: { tag: string }, i: number, self: { id: number; tag: string }[]) => {
              const keyword = tag + ", ";
              if (i === self.length - 1) return tag;
              return keyword;
            })}
          </div>
          <Button
            type="button"
            btnWrapClasses="ml-3 bg-black"
            divWidth="w-2/5"
            height="h-9"
            text="변경"
            isLoading={isLoading}
            onClick={() => setIsTabOpen(true)}
          />
        </div>
      </form>
    </>
  );
};

export default KeywordForm;
