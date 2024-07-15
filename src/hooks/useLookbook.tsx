import { useEffect, useState } from "react";
import { LookbookData } from "../common/types";

const useLookbook = ({ lookbooks }: { lookbooks: LookbookData[] }) => {
  const [lookbookList, setLookBookList] = useState<LookbookData[]>([]);

  const sortingWithFavCounts = (lookbooks: LookbookData[]) => {
    return lookbooks.sort((a, b) => b.fav.length - a.fav.length);
  };

  useEffect(() => {
    if (!lookbooks.length) return;
    setLookBookList(sortingWithFavCounts(lookbooks).splice(0,7));
  }, [lookbooks]);

  return { lookbookList };
};

export default useLookbook;
