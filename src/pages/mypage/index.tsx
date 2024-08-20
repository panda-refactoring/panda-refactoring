import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Image from "next/image";
import { Icon } from "@iconify/react";

import Header from "../../components/common/header";
import Navigation from "../../components/common/navigation";
import UserInfo from "src/components/mypage/user-info";
import CategoryButtons from "src/components/mypage/category-buttons";
import UserPosts from "src/components/mypage/user-posts";
import LoadingSpinner from "../../components/common/ui/loading-spinner";
import noExistUser from "../noExistUser";

import useAuth from "src/hooks/useAuth";

const MyPage: NextPage = () => {
  const [category, setCategory] = useState<string>("items");

  const { userData, isLoading } = useAuth();

  const router = useRouter();

  const handleCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentTarget = event.target as HTMLButtonElement;
    setCategory(currentTarget.name);
  };

  return (
    <>
      <Header />
      <div>
        <div className=" relative h-44 bg-common-gray">
          <Icon
            onClick={() => {
              router.push("/mypage/profile");
            }}
            icon="iconoir:profile-circle"
            className="float-right mx-5 my-5 cursor-pointer text-2xl"
          />
          {userData ? (
            <Image
              src={userData.profileImg as string}
              alt="유저이미지"
              width={50}
              height={50}
              className="absolute left-[155px] top-32 h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="absolute left-[155px] top-32 h-20 w-20 rounded-full bg-textColor-gray-100" />
          )}
        </div>
        <UserInfo userData={userData} />
      </div>
      <CategoryButtons category={category} onClickCategory={handleCategory} />
      <UserPosts userData={userData} category={category} />
      {isLoading && <LoadingSpinner />}
      <Navigation />
    </>
  );
};

export default noExistUser(MyPage);
