import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";

import Loading from "src/components/common/ui/loading";
import Header from "../../components/common/header";
import Navigation from "../../components/common/navigation";
import UserManage from "../../components/user/manage";
import Toast from "src/components/common/ui/toast";
import ProfileImage from "src/components/mypage/profile/profile-image";
import NicknameForm from "src/components/mypage/profile/nickname-form";
import noExistUser from "../noExistUser";

import useAuth from "src/hooks/useAuth";
import KeywordForm from "src/components/mypage/profile/keyword-form";
import { toastContext } from "src/context/toast-context";

const EditProfile: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { userData } = useAuth();

  const { setToast } = useContext(toastContext);

  useEffect(() => {
    if (userData) setIsLoading(false);
  }, [userData]);

  return (
    <>
      <Header goBack text="PROFILE" />
      <Toast />
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <ProfileImage userData={userData} setLoading={setIsLoading} />
          <div className="px-5 py-10">
            <p className="px-2 text-base font-bold">유저정보 수정</p>
            <NicknameForm userData={userData} setToast={setToast} />
            <KeywordForm userData={userData} setToast={setToast} />
          </div>
        </>
      )}
      <UserManage userData={userData} setToast={setToast} />
      <Navigation />
    </>
  );
};

export default noExistUser(EditProfile);
