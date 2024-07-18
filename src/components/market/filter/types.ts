export interface FilterTabProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isOpen: string | null;
  name: string;
  tabData: string[];
  addWords: (word: string) => void;
  wordList: string[];
}
