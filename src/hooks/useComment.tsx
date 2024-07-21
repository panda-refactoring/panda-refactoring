import { useEffect, useState } from "react";
import { useCreateComment, useDeleteComment } from "src/service/query/comment";
import useModal from "./useModal";

const useComment = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [postId, setPostId] = useState<number>(0);
  const [commentId, setCommentId] = useState<number>(0);

  const { mutate: createCommentMutate, status: createCommentStatus } = useCreateComment({ postId });

  const { mutate: deleteCommentMutate, status: deleteCommentStatus } = useDeleteComment({ commentId });

  const { setCommentModal } = useModal();

  const reset = () => {
    setCommentValue("");
    setShowInput(false);
  };

  const setInput = (postId: number) => {
    setCommentValue("");
    setShowInput(true);
    setPostId(postId);
  };

  const updateComment = ({ commentId, text }: { commentId: number; text: string }) => {
    setCommentId(commentId);
    setCommentValue(text);
    setShowInput(true);
  };

  const deleteComment = ({ commentId, userId }: { commentId: number; userId: number }) => {
    setCommentId(commentId);
    const submitFn = () => {
      deleteCommentMutate({ userId });
    };
    setCommentModal({ submitFn });
  };

  useEffect(() => {
    if (createCommentStatus === "success") reset();
    if (createCommentStatus === "error") {
      // TODO: 에러확인 모달 띄우기. (확인버튼만 있는 모달 만들기)
      reset();
    }
  }, [createCommentStatus]);

  useEffect(() => {
    if (deleteCommentStatus === "success") reset();
    if (deleteCommentStatus === "error") {
      // TODO: 에러확인 모달 띄우기. (확인버튼만 있는 모달 만들기)
      reset();
    }
  }, [deleteCommentStatus]);

  return {
    showInput,
    commentValue,
    handleComment: {
      reset,
      setInput,
      onChange: setCommentValue,
      update: updateComment,
      delete: deleteComment,
    },
    mutate: {
      createComment: createCommentMutate,
      deleteComment: deleteCommentMutate,
    },
  };
};

export default useComment;
