import { useEffect, useState } from "react";
import { useCreateComment, useDeleteComment } from "src/service/query/comment";

const useComment = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [postId, setPostId] = useState<number>(0);
  const [commentId, setCommentId] = useState<number>(0);

  const { mutate: createCommentMutate, status: createCommentStatus } = useCreateComment({ postId });

  const { mutate: deleteCommentMutate, status: deleteCommentStatus } = useDeleteComment({ commentId });

  const reset = () => {
    setCommentValue("");
    setShowInput(false);
  };

  const setInput = (postId: number) => {
    setCommentValue("");
    setShowInput(true);
    setPostId(postId);
  };

  const updateComment = (commentId: number, text: string) => {
    setCommentId(commentId);
    setCommentValue(text);
    setShowInput(true);
  };

  const deleteComment = (commentId: number) => {
    setCommentId(commentId);
    // setCommentModalState({ cancel: reset, submit: submit });
  };

  useEffect(() => {
    if (createCommentStatus === "success") reset();
    if (createCommentStatus === "error") {
      // setCommentModalState({ cancel: reset, submit: submit });
      reset();
    }
  }, [createCommentStatus]);

  useEffect(() => {
    if (deleteCommentStatus === "success") reset();
    if (deleteCommentStatus === "error") {
      // setCommentModalState({ cancel: reset, submit: submit });
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
