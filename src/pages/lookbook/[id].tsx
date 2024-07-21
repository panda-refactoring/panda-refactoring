import { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

import { useInfiniteQuery, useQuery } from "react-query";
import { FieldValues } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";

import Header from "../../components/common/header";
import LoadingSpinner from "../../components/common/ui/loading-spinner";
import PostItem from "../../components/lookbook/detail/post-item";

import useModal from "../../hooks/useModal";
import useComment from "src/hooks/useComment";
import { LookbookData } from "../../common/types/data.types";
import { apiGet, apiPost } from "../../service/request";
import CommentForm from "src/components/lookbook/detail/comment-form";

const Post: NextPage = () => {
  const router = useRouter();
  const { id: lookbookId } = router.query;

  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);

  const { contents: userContents } = userInfo;

  const { ref, inView } = useInView();

  const { ModalUI, setLoginModalState } = useModal();

  const { commentMutate, commentValue, setInput, showInput, handleComment } = useComment({ userId: userContents?.id });

  const submit = async (data: FieldValues) => {
    if (!data?.comment) {
      commentMutate(undefined);
      return;
    }

    if (data.comment.trim === "") return;
    commentMutate(data.comment);
  };

  const { data: postData, isLoading } = useQuery<LookbookData>("getPost", () => apiGet.GET_POST(lookbookId as string), {
    enabled: !!lookbookId,
    notifyOnChangeProps: "tracked",
  });

  const {
    data: posts,
    isLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery("posts", ({ pageParam = 1 }) => apiPost.GET_ALL_POST(lookbookId as string, pageParam), {
    getNextPageParam: lastPage => lastPage?.nextId ?? false,
    enabled: !!lookbookId,
    notifyOnChangeProps: "tracked",
  });

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
            setInput={setInput}
            // isModal={show}
            modal={<ModalUI />}
            setModal={setLoginModalState}
            updateComment={handleComment.update}
            deleteComment={handleComment.delete}
          />
        )}
        {!isFetching &&
          posts?.pages.map(page => (
            <Fragment key={page?.nextId ?? "lastPage"}>
              {page?.posts.map((look: LookbookData) => (
                <PostItem
                  key={look.id}
                  userData={userContents}
                  lookbookData={look}
                  setInput={setInput}
                  // isModal={show}
                  modal={<ModalUI />}
                  setModal={setLoginModalState}
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
