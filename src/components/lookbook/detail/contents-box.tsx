import { Icon } from "@iconify/react";
import { NextPage } from "next";
import useFavorite from "src/hooks/useFavorite";
import { ContentsBoxProps } from "./types";

const ContentsBox: NextPage<ContentsBoxProps> = ({ userId, lookbookData, setInput, setShowComment }) => {
  const { id, description, hashTag, comment } = lookbookData;

  const { isFavoriteActive, favoriteCount, toggleFavoriteButton } = useFavorite({
    currentUserId: userId,
    lookbookData,
  });

  const clickComment = () => {
    if (!userId) {
      // setModal();
      return;
    }

    setInput(id);
  };

  const clickFavoriteButton = async () => {
    if (!userId) {
      // setModal();
      return;
    }

    toggleFavoriteButton();
  };

  return (
    <>
      <div>
        <div className="mb-3 flex gap-2 text-xs text-common-gray">
          <div>2023.03.11</div>
          <div>좋아요 {favoriteCount}</div>
        </div>
        {(description || hashTag[0]?.tag !== "") && (
          <p className="mb-2">
            {description && <span className="mr-2">{description}</span>}
            {hashTag?.map(({ tag }, i) => (
              <span key={`태그${i}`} className="mr-1">
                {tag !== "" && `#${tag}`}
              </span>
            ))}
          </p>
        )}
        <span className="cursor-pointer text-common-gray hover:underline" onClick={() => setShowComment(true)}>
          댓글 {comment ? comment.length : 0}개
        </span>
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-3 text-2xl [&>svg]:cursor-pointer">
        <Icon icon="ci:chat-circle" onClick={clickComment} />
        {isFavoriteActive ? (
          <Icon icon="icon-park-solid:like" color="#ff5252" onClick={clickFavoriteButton} />
        ) : (
          <Icon icon="icon-park-outline:like" onClick={clickFavoriteButton} />
        )}
      </div>
    </>
  );
};

export default ContentsBox;
