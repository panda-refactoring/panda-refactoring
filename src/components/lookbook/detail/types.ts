import { Dispatch, SetStateAction } from "react";
import { FieldValues } from "react-hook-form";
import { LookbookData, UserData } from "src/common/types/data.types";

export interface CommentFormProps {
  commentValue: string;
  submit: (data: FieldValues) => void;
  onChange: Dispatch<SetStateAction<string>>;
}

interface Comment {
  id: number;
  text: string;
  author: {
    nickname: string;
  };
}

export interface CommentListProps {
  userData: UserData;
  comment: Comment[] | undefined;
  updateComment: (commentId: number, text: string) => void;
  deleteComment: (commentId: number) => void;
}

export interface PostItemProps {
  userData: UserData;
  lookbookData: LookbookData;
  setInput: (postId: number) => void;
  updateComment: (commentId: number, text: string) => void;
  deleteComment: (commentId: number) => void;
  modal: React.ComponentType | JSX.Element;
  setModal: () => void;
  isModal?: boolean;
}

export interface ContentsBoxProps {
  userId: number;
  lookbookData: LookbookData;
  setInput: (postId: number) => void;
  setShowComment: Dispatch<SetStateAction<boolean>>;
}
