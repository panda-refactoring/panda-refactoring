import { Dispatch, SetStateAction } from "react";

export interface SearchWordsProps {
  enteredWord: string;
  recentWords: string[];
  setRecentWords: Dispatch<SetStateAction<string[]>>;
}
