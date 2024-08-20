import { useMutation } from "react-query";

import { apiPost } from "../request";
import useToast from "src/hooks/useToast";

const BASE_PROFILE_KEY = "profile";

const PROFILE_KEY = {
  IMAGE: [BASE_PROFILE_KEY, "profile-image"],
  NICKNAME_CHECK: [BASE_PROFILE_KEY, "check-nickname"],
  NICKNAME_UPDATE: [BASE_PROFILE_KEY, "update-nickname"],
  KEYWORDS: [BASE_PROFILE_KEY, "keywords"],
};

export const useUpdateProfileImage = ({ userId }: { userId: number }) => {
  const { setToast } = useToast();

  return useMutation({
    mutationKey: PROFILE_KEY.IMAGE,
    mutationFn: async ({ imageurl }: { imageurl: string }) =>
      await apiPost.UPDATE_PROFILE({ imageurl, userData: userId }),
    onSuccess: ({ message }) => {
      setToast({ message });
    },
  });
};

export const useCheckNickname = () => {
  return useMutation({
    mutationKey: PROFILE_KEY.NICKNAME_CHECK,
    mutationFn: async (nickname: string) => await apiPost.CREATE_NICKNAME({ nickname }),
  });
};

export const useUpdateNickname = ({ userId }: { userId: number }) => {
  return useMutation({
    mutationKey: PROFILE_KEY.NICKNAME_UPDATE,
    mutationFn: async (nickname: string) => await apiPost.UPDATE_NICKNAME(userId.toString(), { nickname }),
  });
};

export const useUpdateUserKeywords = ({ userId }: { userId: number }) => {
  return useMutation({
    mutationKey: PROFILE_KEY.KEYWORDS,
    mutationFn: async (keywords: string[]) => await apiPost.UPDATE_TAG(userId, { tags: keywords }),
  });
};
