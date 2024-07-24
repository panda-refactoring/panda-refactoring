import { NextPage } from "next";
import { useState } from "react";

import ImageSlide from "../../market/detail/image-slide";
import TagItem from "./tag-item";
import Modal from "src/components/common/ui/modal";
import CommentList from "./comment-list";
import ContentsBox from "./contents-box";

import { PostItemProps } from "./types";

const PostItem: NextPage<PostItemProps> = props => {
  const [showComment, setShowComment] = useState<boolean>(false);

  const { userData, lookbookData, updateComment, deleteComment, setInput } = props;

  const { user, imgurl, comment, product } = lookbookData;

  const hasComment = comment && comment.length > 0;

  return (
    <>
      <Modal />
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center">
          <img src={user.profileImg} alt="" className="mr-3 h-10 w-10 rounded-full border-2 border-common-black" />
          <div>
            <p className="text-sm font-bold">{user.nickname}</p>
          </div>
        </div>
      </div>
      <ImageSlide images={imgurl} />
      <div className="relative p-5">
        <ContentsBox
          userId={userData?.id}
          lookbookData={lookbookData}
          setInput={setInput}
          setShowComment={setShowComment}
        />
        {showComment && hasComment && (
          <CommentList
            userData={userData}
            comment={comment}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        )}
        {product.length > 0 && (
          <div className="mt-3 border-t border-borderColor-gray">
            <h2 className="mt-[18px] text-lg">Tagged</h2>
            <ul className="mt-3 flex gap-2 overflow-y-scroll scrollbar-hide">
              <TagItem {...product} />
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PostItem;
