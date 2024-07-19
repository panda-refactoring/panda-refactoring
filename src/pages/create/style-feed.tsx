import { useState } from "react";

import { Icon } from "@iconify/react";
import { FieldErrors, useForm } from "react-hook-form";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "src/recoil/user";

import Overlay from "../../components/common/overlay";
import Header from "../../components/common/header";
import Button from "../../components/common/ui/button";
import Toast from "src/components/common/ui/toast";
import UploadImages from "../../components/create/upload-images";
import ProductTagTab from "../../components/create/style-feed/product-tab";
import noExistUser from "../noExistUser";

import { cls } from "../../common/util/class";
import { ProductDataMin } from "../../common/types/data.types";
import { CreateState } from "../../common/types/create.types";
import useTextArea from "src/hooks/useTextArea";
import useCreatePost from "src/hooks/useCreatePost";
import TagItem from "src/components/create/style-feed/tag-item";

const CreatePost = () => {
  const [tagItems, setTagItems] = useState<ProductDataMin[]>([]);
  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);

  const userData = useRecoilValueLoadable(currentUserInfoQuery);

  const {
    submit,
    status: isLoading,
    toast,
    handleImage,
  } = useCreatePost({ type: "styleFeed", userData: userData.contents });

  const { register, handleSubmit } = useForm<CreateState>({
    mode: "onSubmit",
  });

  const { isFocus, handleTextArea } = useTextArea();

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
    submit({ data, tagIdList });
  };

  const inValid = (error: FieldErrors) => {
    toast.setToast({ message: error.image?.message as string, isError: true });
  };

  return (
    <>
      <Header goBack />
      {toast.showToast && <Toast {...toast.toastController} />}
      {isTabOpen && <Overlay />}
      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <UploadImages
            register={register}
            deleteImage={handleImage.deleteImage}
            encodeFile={handleImage.encodeFile}
            imgsrc={handleImage.imgsrc}
          />
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
              <TagItem tagItem={item} removeItem={removeTagItem} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default noExistUser(CreatePost);
