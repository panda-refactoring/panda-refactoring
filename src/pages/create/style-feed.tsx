import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Icon } from "@iconify/react";
import { FieldErrors, useForm } from "react-hook-form";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery, userInfoQuery } from "src/recoil/user";

import Overlay from "../../components/common/overlay";
import Header from "../../components/common/header";
import Button from "../../components/common/ui/button";
import Toast from "src/components/common/ui/toast";
import UploadImages from "../../components/create/upload-images";
import ProductTagTab from "../../components/create/style-feed/product-tab";
import TagItem from "src/components/create/style-feed/tag-item";
import noExistUser from "../noExistUser";

import useToast from "src/hooks/useToast";
import useUpload from "src/hooks/useUpload";
import useTextArea from "src/hooks/useTextArea";
import { cls } from "../../common/util/class";
import { createImageUrl } from "src/common/util/image-url";
import { credentials } from "src/common/lib/credentials";
import { ProductDataMin } from "../../common/types/data.types";
import { CreateState } from "../../common/types/create.types";
import { useCreateStyleFeed } from "src/service/query/create";

const CreatePost = () => {
  const [tagItems, setTagItems] = useState<ProductDataMin[]>([]);
  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);

  const userData = useRecoilValueLoadable(currentUserInfoQuery);
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(userInfoQuery(userData?.contents?.email));

  const router = useRouter();

  const { setToast, showToast, toastController } = useToast();

  const { deleteImage, encodeFile, imgsrc } = useUpload(credentials);

  const { register, handleSubmit } = useForm<CreateState>({
    mode: "onSubmit",
  });

  const { isFocus, handleTextArea } = useTextArea();

  const { mutate: mutateStyleFeed, isLoading, isSuccess, isError } = useCreateStyleFeed();

  const openTab = () => setIsTabOpen(true);

  const closeTab = () => setIsTabOpen(false);

  const setTagItemList = (list: ProductDataMin[]) => {
    setTagItems(list);
  };

  const removeTagItem = (id: number) => {
    setTagItems(prev => prev.filter(item => item.id !== id));
  };

  const valid = async (data: CreateState) => {
    const tagIdList = tagItems.map(item => +item.id);

    const imageUrlList: string[] = [];
    imgsrc.forEach(item => {
      // uploadImage(item.file, type); // s3로 업로드하는 함수 임시 주석.
      const imageurl = createImageUrl(item.file, "market");
      imageUrlList.push(imageurl);
    });

    mutateStyleFeed({ data, tagIdList, imageUrlList });
  };

  const inValid = (error: FieldErrors) => {
    setToast({ message: error.image?.message as string, isError: true });
  };

  useEffect(() => {
    setToast({ message: "게시글 등록이 완료되었습니다." });
    refreshUserInfo();
    setTimeout(() => router.replace("/mypage"), 1000);
  }, [isSuccess]);

  useEffect(() => {
    setToast({
      message: ["게시글 등록에 실패했어요😥!", "다시 시도해주세요."],
      isError: true,
    });
  }, [isError]);

  return (
    <>
      <Header goBack />
      {showToast && <Toast {...toastController} />}
      {isTabOpen && <Overlay />}
      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <UploadImages register={register} deleteImage={deleteImage} encodeFile={encodeFile} imgsrc={imgsrc} />
          <div className="border-b border-t border-borderColor-gray pb-2 [&>input]:h-[52px] [&>input]:border-b [&>input]:px-4">
            <div className="relative h-auto w-full p-5">
              <textarea
                {...register("desc")}
                name="desc"
                rows={10}
                className={cls("peer w-full resize-none", isFocus ? "is-valid" : "")}
                onChange={handleTextArea}
              />
              <div className="pointer-events-none absolute left-5 top-5 bg-transparent text-common-gray peer-focus:hidden peer-[.is-valid]:hidden">
                <p>문구를 작성해주세요.</p>
              </div>
            </div>
            <input
              {...register("tag")}
              type="text"
              name="tag"
              placeholder="스타일관련 태그를 작성할 수 있습니다. Ex. #style"
              autoComplete="off"
              className="border"
            />
          </div>
          <div className="[&>*]:flex [&>*]:h-[52px] [&>*]:items-center [&>*]:justify-between [&>*]:border-b [&>*]:px-4 [&>*]:hover:bg-[#f7f7f7]">
            <div onClick={openTab}>
              <span>상품 태그</span>
              <Icon icon="material-symbols:arrow-outward" />
            </div>
          </div>
          <div className="fixed bottom-0 mt-40 w-[350px]">
            <Button
              type="submit"
              text="완료"
              btnWrapClasses="py-5"
              classes="bg-black"
              fontColor="text-white"
              isLoading={isLoading}
            />
          </div>
        </form>
        {isTabOpen && (
          <ProductTagTab
            product={userData?.contents?.product}
            tagItems={tagItems}
            closeTab={closeTab}
            onSetItems={setTagItemList}
          />
        )}
        {tagItems.length > 0 && (
          <ul className="mt-5 h-80 w-full space-y-4 overflow-hidden overflow-y-scroll">
            {tagItems.map(item => (
              <TagItem key={item.id} tagItem={item} removeItem={removeTagItem} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default noExistUser(CreatePost);
