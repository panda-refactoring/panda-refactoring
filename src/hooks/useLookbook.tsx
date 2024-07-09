import { useEffect, useState } from "react";
import { LookbookData } from "../types/data-type";

const useLookbook = ({ lookbooks }: { lookbooks: LookbookData[] }) => {
  const [lookbookList, setLookBookList] = useState<LookbookData[]>([]);

  const sortingWithFavCounts = (lookbooks: LookbookData[]) => {
    return lookbooks.sort((a, b) => b.fav.length - a.fav.length);
  };

  useEffect(() => {
    if (!lookbooks.length) return;
    setLookBookList(sortingWithFavCounts(lookbooks));
  }, [lookbooks]);

  return { lookbookList };
};

export default useLookbook;
