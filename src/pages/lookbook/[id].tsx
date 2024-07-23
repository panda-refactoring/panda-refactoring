import { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

import { FieldValues } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";

import Header from "../../components/common/header";
import LoadingSpinner from "../../components/common/ui/loading-spinner";
import PostItem from "../../components/lookbook/detail/post-item";
import CommentForm from "src/components/lookbook/detail/comment-form";

import useComment from "src/hooks/useComment";
import { LookbookData } from "../../common/types/data.types";
import { useGetLookBookList, useGetLookBookPost } from "src/service/query/lookbook";

const Post: NextPage = () => {
  const router = useRouter();
  const { id: lookbookId } = router.query;

  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);

  const { contents: userContents } = userInfo;

  const { ref, inView } = useInView();

  const { commentValue, showInput, handleComment, mutate } = useComment();

  const submit = async (data: FieldValues) => {
    if (data.comment.trim === "") return;

    const payload = { userId: userContents?.id ?? 1, comment: data.comment };
    mutate.createComment(payload);
  };

  const { data: postData, isLoading } = useGetLookBookPost({ lookbookId: lookbookId?.toString() ?? "1" });

  const {
    data: posts,
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetLookBookList({ lookbookId: lookbookId?.toString() ?? "1" });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <div className="pb-10">
        <Header goBack />
        {isLoading && <LoadingSpinner />}
        {postData && (
          <PostItem
            userData={userContents}
            lookbookData={postData}
            setInput={handleComment.setInput}
            updateComment={handleComment.update}
            deleteComment={handleComment.delete}
          />
        )}
        {!isListLoading &&
          posts?.pages.map(page => (
            <Fragment key={page?.nextId ?? "lastPage"}>
              {page?.posts.map((look: LookbookData) => (
                <PostItem
                  key={look.id}
                  userData={userContents}
                  lookbookData={look}
                  setInput={handleComment.setInput}
                  updateComment={handleComment.update}
                  deleteComment={handleComment.delete}
                />
              ))}
            </Fragment>
          ))}
      </div>
      {hasNextPage && (
        <span ref={ref}>
          <LoadingSpinner />
        </span>
      )}
      {showInput && <CommentForm commentValue={commentValue} submit={submit} onChange={handleComment.onChange} />}
    </div>
  );
};

export default Post;
