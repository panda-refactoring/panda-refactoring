import { useMutation, useQueryClient } from "react-query";
import { apiPost } from "../request";
import { CreateCommentMutate, DeleteCommentMutate } from "./comment.types";

const BASE_COMMENT_KEY = "comment";

const COMMENT_KEY = {
  CREATE: [BASE_COMMENT_KEY, "create"],
  DELETE: [BASE_COMMENT_KEY, "delete"],
};

export const useCreateComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: COMMENT_KEY.CREATE,
    mutationFn: (payload: CreateCommentMutate) => apiPost.CREATE_COMMENT(postId, payload),
    onSuccess: () => queryClient.invalidateQueries("getPost"),
  });
};

export const useDeleteComment = ({ commentId }: { commentId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: COMMENT_KEY.DELETE,
    mutationFn: (payload: DeleteCommentMutate) => apiPost.UPDATE_COMMENT(commentId, payload),
    onSuccess: () => queryClient.invalidateQueries("getPost"),
  });
};
