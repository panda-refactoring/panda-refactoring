import { useEffect } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";

import useUpload from "src/hooks/useUpload";
import { createImageUrl } from "src/common/util/image-url";
import { credentials } from "src/common/lib/credentials";
import { useUpdateProfileImage } from "src/service/query/profile";
import { ProfileImageProps } from "./types";

const ProfileImage = ({ userData, setLoading }: ProfileImageProps) => {
  const { register } = useForm({});

  const { encodeFile, imgsrc } = useUpload(credentials);

  const { mutate: profileImageMutation, isSuccess } = useUpdateProfileImage({ userId: userData?.id });

  useEffect(() => {
    if (imgsrc.length === 0) return;

    // uploadImage(imgsrc[0]?.file, "profile");
    const imageurl = createImageUrl(imgsrc[0]?.file, "profile");

    profileImageMutation({ imageurl });
  }, [imgsrc]);

  useEffect(() => {
    if (isSuccess) {
      imgsrc.length = 0;
      setLoading(true);
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="relative h-44 bg-gray-300">
        <div className="relative top-32 h-20 w-20 translate-x-[155px] transform overflow-hidden rounded-full bg-slate-700">
          <Image
            src={`${userData?.profileImg}`}
            alt="유저이미지"
            width={50}
            height={50}
            className="w-full object-cover"
          />
          <label className="absolute bottom-0 z-10 h-[22px] w-20 bg-black text-center text-white">
            <input
              {...register("image")}
              id="picture"
              type="file"
              accept="image/png, image/jpeg"
              multiple={false}
              onChange={encodeFile}
              className="hidden"
            />
            변경
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
