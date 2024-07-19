import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { useRecoilRefresher_UNSTABLE } from "recoil";
import { userInfoQuery } from "src/recoil/user";

import useToast from "./useToast";
import useUpload from "./useUpload";

import { createImageUrl } from "src/common/util/image-url";
import { credentials } from "src/common/lib/credentials";
import { apiPost } from "src/service/request";
import { CreateState, Options } from "src/common/types/create.types";
import { UserData } from "src/common/types/data.types";

interface useCreatePostProps {
  type: "market" | "styleFeed";
  userData: UserData;
}

interface MutatePayload {
  data: CreateState;
  imageUrlList?: string[];
  tagIdList?: number[];
  options?: Options;
}

const useCreatePost = ({ type, userData }: useCreatePostProps) => {
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(userInfoQuery(userData?.email));

  const router = useRouter();

  const { setToast, Toast } = useToast();

  const { uploadImage, deleteImage, encodeFile, imgsrc } = useUpload(credentials);

  const createRequest = async (requestData: MutatePayload) => {
    const { data, imageUrlList, tagIdList, options } = requestData;
    const payload =
      type === "market"
        ? { data, imageUrlList, options, userId: userData?.id ?? 1 }
        : { data, imageUrlList, tagIdList, userId: userData?.id ?? 1 };
    const response = type === "market" ? await apiPost.CREATE_ITEM(payload) : await apiPost.CREATE_POST(payload);
    return response;
  };

  const { mutate, isLoading } = useMutation(createRequest, {
    onSuccess: ({ message }) => {
      const toastMessage = message ?? "등록이 완료되었습니다.";
      setToast(toastMessage, false);
      refreshUserInfo();
      router.replace("/mypage");
    },
    onError: ({ response }) => {
      setToast(response.data.message, true);
    },
  });

  const submit = (submitData: MutatePayload) => {
    const imageUrlList: string[] = [];
    imgsrc.forEach(item => {
      // uploadImage(item.file, type); // s3로 업로드하는 함수 임시 주석.
      const imageurl = createImageUrl(item.file, type);
      imageUrlList.push(imageurl);
    });

    mutate({ ...submitData, imageUrlList });
  };

  return {
    submit,
    status: isLoading,
    ToastUI: Toast,
    setToast,
    handleImage: { imgsrc, deleteImage, encodeFile },
  };
};

export default useCreatePost;
