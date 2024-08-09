import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FormEvent, useContext, useState } from "react";
import profile from "public/asset/image/addprofile.png";

import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import Header from "../../components/common/header";
import Button from "../../components/common/ui/button";
import Toast from "src/components/common/ui/toast";
import existUser from "../existUser";

import useUpload from "../../hooks/useUpload";
import { createImageUrl } from "../../common/util/image-url";
import { cls } from "../../common/util/class";
import { credentials } from "../../common/lib/credentials";
import { toastContext } from "src/context/toast-context";
import { apiGet, apiPost } from "../../service/request";

const SignProfile: NextPage = () => {
  const router = useRouter();
  const userEmail = router.query.email;

  const { encodeFile, imgsrc } = useUpload(credentials);

  const { setToast } = useContext(toastContext);

  const [pass, setPass] = useState<boolean>(false); //닉네임 중복 통과 state

  const getUser = () => apiGet.GET_USER(userEmail as string);

  //유저 정보를 query 로 전달받아서 signUser 의 user.id 을 이용해 다음단계이어감
  const { data: signUser } = useQuery("userData", getUser);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({});

  //닉네임 중복확인
  const onDuplication = (event: FormEvent) => {
    event.preventDefault();
    const nickname = getValues("nickname");
    if (nickname.trim() === "") return;
    nickMutate(nickname);
  };

  //닉네임 등록
  const createNickName = async (createNick: string) => {
    const response = await apiPost.CREATE_NICKNAME({
      nickname: createNick,
    });
    return response;
  };

  const { mutate: nickMutate, isLoading: nickLoading } = useMutation(createNickName, {
    onSuccess: ({ message }) => {
      setToast({ message });
      setPass(true);
    },
    onError: ({ response }) => {
      setToast({ message: response.data.message, isError: true });
      setPass(false);
    },
  });

  //프로필 이미지 등록
  const createProfile = async (userProfile: FieldValues) => {
    const enteredImage = imgsrc[imgsrc.length - 1];
    // uploadImage(enteredImage.file, "profile");
    const imageurl = createImageUrl(enteredImage.file, "profile");
    userProfile.image = imageurl;

    const response = await apiPost.CREATE_PROFILE<{
      userProfile: FieldValues;
      userData: number;
    }>({
      userProfile,
      userData: signUser.user.id,
    });

    return response;
  };

  const { mutate: profileMutate, isLoading: profileLoading } = useMutation(createProfile, {
    onSuccess: () => {
      router.replace("/sign/welcome");
      signOut({ redirect: false }); //회원가입을 할 경우에 로그인 되어있어서 강제 로그아웃시킴
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  return (
    <>
      <Header text="SIGNUP" goBack noGoBack />
      <Toast />
      <div className="px-8">
        <p className="mb-1 mt-7 text-xl">마지막이에요!</p>
        <p className="text-textColor-gray-100">사용하실 닉네임과 프로필사진을 설정해주세요.</p>
      </div>
      <form onSubmit={handleSubmit(submitData => profileMutate({ ...submitData }))}>
        <div className="signup-minheight mt-24 flex flex-col items-center px-5">
          <label className="relative h-[178px] w-[178px] cursor-pointer rounded-full bg-textColor-gray-100">
            {imgsrc.length !== 0 ? (
              <Image
                src={imgsrc[imgsrc.length - 1]?.dataUrl}
                alt="업로드이미지"
                width={178}
                height={178}
                className="h-[178px] w-[178px] rounded-full object-cover"
              />
            ) : (
              <Image
                src={profile}
                alt="기본이미지"
                width={160}
                height={160}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
            <input
              {...register("image", { required: "이미지를 등록해주세요." })}
              id="picture"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              multiple={false}
              onChange={encodeFile}
            />
          </label>
          <div className="mt-8 flex w-full items-center justify-between gap-4 px-3">
            <input
              {...register("nickname", { minLength: 1 })}
              placeholder="닉네임"
              className={cls("h-[42px] w-full border-b border-black", errors.nickname ? "border-error" : "")}
            />
            <Button
              type="button"
              text="중복확인"
              onClick={onDuplication}
              classes="bg-black"
              divWidth="w-[115px]"
              width="w-[115px]"
              height="h-[42px]"
              isLoading={nickLoading}
            />
          </div>
        </div>
        <Button
          disabled={!pass}
          type="submit"
          text="완료"
          classes="bg-black"
          btnWrapClasses="px-8"
          isLoading={profileLoading}
        />
      </form>
    </>
  );
};

export default existUser(SignProfile);
