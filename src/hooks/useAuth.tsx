import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useMutation } from "react-query";

import useModal from "./useModal";
import { apiGet } from "../utils/request";
import { isCookie, setCookie } from "../utils/cookie";

const useAuth = () => {
  const { data: userEmail, status: session } = useSession();

  const { setAuthModalState } = useModal();

  const {
    data,
    mutate,
    status: mutateStatus,
  } = useMutation({
    mutationFn: async (email: string) => await apiGet.GET_USER(email),
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err)
  });

  useEffect(() => {
    console.log(userEmail)
    if (session === "authenticated") {
      mutate(userEmail.user?.email as string);
      return;
    }

    if (session === "unauthenticated") {
      const visitor = isCookie("panda_visitor"); // 쿠키 확인 ~> panda_visitor
      if (!visitor) {
        console.log("사용자 인증 오류!");
        setAuthModalState({ cancel: setCookie });
        return;
      }
      console.log("유효한 방문자");
      return;
    }
  }, [session]);

  return { userData: data, status: mutateStatus };
};

export default useAuth;
