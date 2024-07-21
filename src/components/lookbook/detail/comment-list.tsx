import { CommentListProps } from "./types";

const CommentList = ({ userData, comment, updateComment, deleteComment }: CommentListProps) => {
  const currentUserNickname = userData ? userData.nickname : "";

  return (
    <div className="py-4">
      <div>
        <h2 className="mr-2 inline-block text-lg">comments</h2>
        <span className="text-base font-bold">{comment?.length}</span>
      </div>
      <ul className="mt-3">
        {comment?.map(({ id, author, text }, i) => (
          <li key={`코멘트${i}`} className="flex justify-between">
            <div className="flex gap-3">
              <b className="text-base font-bold">{author.nickname}</b>
              {text}
            </div>
            {author.nickname == currentUserNickname && (
              <div className="flex gap-3 text-textColor-gray-100">
                <button onClick={() => updateComment(id, text)}>수정</button>
                <button onClick={() => deleteComment(id)}>삭제</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
