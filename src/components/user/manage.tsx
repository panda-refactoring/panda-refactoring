import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { axiosDelete } from "../../service/request";
import { UserManageProps } from "./types";

const UserManage: NextPage<UserManageProps> = ({ userData, setToast }) => {
  const router = useRouter();

  const signout = () => {
    router.replace("/login").then(() => signOut());
  };

  const { mutate: userMutate } = useMutation((id: number) => axiosDelete(id as unknown as string), {
    onSuccess: () => {
      setToast({ message: "회원탈퇴가 완료되었습니다" });
      setTimeout(() => signout(), 2500);
    },
    onError: () => {
      setToast({ message: "다시 시도해주세요", isError: true });
    },
  });

  const handleDelete = () => {
    if (!userData) return;
    if (typeof userData.id === "number") userMutate(userData.id);
  };

  return (
    <div className="fixed bottom-0 w-[390px] px-6 py-14 text-textColor-gray-100">
      <div className="flex cursor-pointer items-center justify-between py-3" onClick={signout}>
        <p className="text-base font-bold">로그아웃</p>
        <Icon icon="material-symbols:chevron-right-sharp" className=" text-xl font-bold" />
      </div>
      <div className="flex cursor-pointer items-center justify-between py-3" onClick={handleDelete}>
        <p className="text-base font-bold">회원탈퇴</p>
        <Icon icon="material-symbols:chevron-right-sharp" className=" text-xl font-bold" />
      </div>
    </div>
  );
};

export default UserManage;
