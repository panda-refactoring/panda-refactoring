import { useEffect, useState } from "react";
import { LookbookData } from "../common/types/data.types";

const useLookbook = ({ lookbooks }: { lookbooks: LookbookData[] }) => {
  const [lookbookList, setLookBookList] = useState<LookbookData[]>([]);

  const sortingWithFavoriteCounts = (lookbooks: LookbookData[]) => {
    return lookbooks.sort((a, b) => b.favorite.length - a.favorite.length);
  };

  useEffect(() => {
    if (!lookbooks.length) return;
    setLookBookList(sortingWithFavoriteCounts(lookbooks).splice(0, 7));
  }, [lookbooks]);

  return { lookbookList };
};

export default useLookbook;
