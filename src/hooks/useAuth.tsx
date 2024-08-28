import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";

import useModal from "./useModal";
import { apiGet } from "../service/request";
import { isCookie, setCookie } from "../common/util/cookie";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const { data: userEmail, status: session } = useSession();

  const { setAuthModal } = useModal();

  const goLoginPage = () => router.push("/login");

  const { data, mutate, isLoading, status } = useMutation({
    mutationKey: ["userData"],
    mutationFn: (email: string) => apiGet.GET_USER(email),
  });

  useEffect(() => {
    if (session === "authenticated") {
      mutate(userEmail.user?.email as string);
      return;
    }

    if (session === "unauthenticated") {
      const visitor = isCookie("panda_visitor"); // 쿠키 확인 ~> panda_visitor
      if (!visitor) {
        console.log("사용자 인증 오류!");
        setAuthModal({ submitFn: goLoginPage, cancelFn: setCookie });
        return;
      }
      console.log("유효한 방문자");
      return;
    }
  }, [session]);

  return { userData: data?.user, isLoading, status };
};

export default useAuth;
