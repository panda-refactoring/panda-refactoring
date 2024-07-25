import { Dispatch, SetStateAction } from "react";
import { UserData } from "src/common/types/data.types";

export interface ProfileImageProps {
  userData: UserData;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface ProfileFormProps {
  userData: UserData;
  setToast: ({ message, isError }: { message: string; isError?: boolean }) => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

export interface KeywordProps {
  keyword: string;
  selectedKeywords: string[];
  onSetKeywords: (data: string) => void;
}
