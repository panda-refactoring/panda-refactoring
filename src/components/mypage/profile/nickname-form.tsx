import { useEffect, useState } from "react";

import Button from "src/components/common/ui/button";

import { ProfileFormProps } from "./types";
import { useCheckNickname, useUpdateNickname } from "src/service/query/profile";

const NicknameForm = ({ userData, setToast }: ProfileFormProps) => {
  const [nickname, setNickname] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate: checkNicknameMutation, data, error, isSuccess, isLoading, isError } = useCheckNickname();

  const {
    mutate: updateNicknameMutation,
    data: updateData,
    error: updateError,
    isSuccess: isUpdateSuccess,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = useUpdateNickname({ userId: userData?.id });

  const changeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickname(value);
  };

  const clickNicknameButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEditing) {
      if (nickname.trim() === "") {
        setNickname(userData?.nickname);
        setIsEditing(false);
        return;
      }

      checkNicknameMutation(nickname);
      return;
    }

    setIsEditing(true);
  };

  useEffect(() => {
    if (isSuccess && data.status === "ok") {
      updateNicknameMutation(nickname);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdateSuccess && updateData.status === "ok") {
      setToast({ message: "닉네임이 변경되었습니다." });
      setIsEditing(false);
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isError) setToast({ message: error.response.data, isError: true });
    if (isUpdateError) setToast({ message: updateError.response.data, isError: true });
  }, [isError, isUpdateError]);

  return (
    <>
      <p className="text-textColor-gr ay-100 mt-5 px-2 text-sm">닉네임</p>
      <form className="my-2 flex w-full justify-between px-3" onSubmit={clickNicknameButton}>
        <input
          placeholder={userData?.nickname}
          className="border-b-[1px] border-solid border-black bg-transparent text-black outline-0 placeholder:text-textColor-gray-100 disabled:text-textColor-gray-100"
          disabled={!isEditing}
          onChange={changeNickname}
        />
        <Button
          type="submit"
          btnWrapClasses="ml-3 bg-black"
          divWidth="w-2/5"
          height="h-9"
          text={isEditing ? "완료" : "변경"}
          isLoading={isLoading || isUpdateLoading}
        />
      </form>
    </>
  );
};

export default NicknameForm;
