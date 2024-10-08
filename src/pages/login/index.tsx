import type { NextPage } from "next";
import Image from "next/image";
import logo from "public/asset/image/full-logo.png";
import graphic1 from "public/asset/image/graphic1.svg";
import graphic2 from "public/asset/image/graphic2.svg";
import graphic3 from "public/asset/image/graphic3.svg";
import graphic4 from "public/asset/image/graphic4.svg";
import LoginForm from "../../components/login/login-form";
import Button from "../../components/common/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import existUser from "../existUser";
import useModal from "../../hooks/useModal";
import { apiGet } from "../../service/request";

const Login: NextPage = () => {
  const { data: session } = useSession();
  const alerted = useRef(false);
  const router = useRouter();

  const goSigninPage = () => router.push("/sign");

  const { setSigninModal } = useModal();

  const findUser = async (userEmail: string) => {
    const { data } = await apiGet.GET_USER(userEmail);
    return data;
  };

  const { mutate, data } = useMutation(findUser);

  const GoogleLogin = async () => {
    await signIn("google");
  };

  const KakaoLogin = async () => {
    await signIn("kakao");
  };

  useEffect(() => {
    session && mutate(session?.user?.email as string);
  }, [session]);

  useEffect(() => {
    if (session && data) {
      if (data.user.keywords.length === 0 && !alerted.current) {
        alerted.current = true;
        setSigninModal({ submitFn: goSigninPage });
        return;
      } else {
        router.push("/");
        return;
      }
    }
  }, [data]);

  return (
    <div className="relative h-screen w-full bg-black">
      <Image src={graphic1} alt="" className="absolute -left-3 -top-3 w-1/2" />
      <Image src={graphic2} alt="" className="absolute right-0 top-20 w-1/4" />
      <Image src={graphic3} alt="" className="absolute right-0 top-1/2 w-1/2" />
      <Image src={graphic4} alt="" className="absolute -left-10 bottom-0" />
      <div className="absolute top-1/2 z-10 h-4/5 w-full -translate-y-1/2 px-5">
        <div className="mt-10 pb-10">
          <Image src={logo} alt="logo" className="m-auto h-28 w-auto" priority />
        </div>
        <LoginForm />
        <Button
          type="button"
          text="Continue With Google"
          onClick={GoogleLogin}
          classes="bg-white"
          btnWrapClasses="px-8"
          icon="ph:google-logo"
          position="absolute left-0 bottom-[60px]"
          textWidth="w-3/5"
          fontColor="text-black"
        />
        <Button
          type="button"
          onClick={KakaoLogin}
          text="Continue With Kakao"
          icon="ri:kakao-talk-fill"
          classes="bg-primary-yellow"
          btnWrapClasses="px-8"
          textWidth="w-3/5"
          position="absolute left-0 bottom-0"
          fontColor="text-black"
        />
      </div>
    </div>
  );
};

export default existUser(Login);
