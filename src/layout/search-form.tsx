import { useRouter } from "next/router";
import { useState } from "react";

const MainSearchForm = () => {
  const [searchWord, setSearchWord] = useState<string>("");

  const router = useRouter();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchWord.trim() === "") return;

    router
      .push({
        pathname: "/search",
        query: { word: searchWord },
      })
      .then(res => res && setSearchWord(""));
  };

  return (
    <form className="relative mt-6 flex items-center" onSubmit={search}>
      <input
        value={searchWord}
        onChange={onChange}
        type="text"
        className="w-[400px] rounded-full border-4 border-primary-green px-7 py-4 text-xl text-gray-700 focus:outline-none"
      />
      <button type="submit" className="absolute right-4 cursor-pointer text-3xl text-black">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default MainSearchForm;
