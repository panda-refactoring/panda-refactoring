import { useForm } from "react-hook-form";
import { CommentFormProps } from "./types";
import { Icon } from "@iconify/react";

const CommentForm = ({ commentValue, submit, onChange }: CommentFormProps) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="fixed bottom-0 z-10 flex h-[60px] w-[390px] items-center justify-between border-t border-borderColor-gray bg-white px-5"
    >
      <input
        type="text"
        placeholder="댓글을 입력해주세요."
        value={commentValue}
        {...register("comment", {
          onChange: e => onChange(e.target.value),
        })}
      />
      <Icon icon="tabler:mood-smile" className="cursor-pointer text-xl text-textColor-gray-100" />
    </form>
  );
};

export default CommentForm;
