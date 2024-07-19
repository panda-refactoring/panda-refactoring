import { Icon } from "@iconify/react";
import { useForm, FieldErrors } from "react-hook-form";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "src/recoil/user";

import Header from "../../components/common/header";
import Overlay from "../../components/common/overlay";
import Button from "../../components/common/ui/button";
import UploadImages from "../../components/create/upload-images";
import OptionTab from "../../components/create/market/option-tab";
import noExistUser from "../noExistUser";

import useTextArea from "src/hooks/useTextArea";
import useCreatePost from "src/hooks/useCreatePost";
import useOptions from "../../hooks/useOptions";
import { cls } from "../../common/util/class";
import { createValidation } from "src/common/util/validate";
import { CreateState } from "../../common/types/create.types";

const Create = () => {
  const userData = useRecoilValueLoadable(currentUserInfoQuery);

  const {
    submit,
    status: isLoading,
    ToastUI,
    setToast,
    handleImage,
  } = useCreatePost({ type: "market", userData: userData.contents });

  const { register, handleSubmit } = useForm<CreateState>({
    mode: "onSubmit",
  });

  const { options, isTabOpen, handleOption } = useOptions();

  const { isFocus, handleTextArea } = useTextArea();

  const valid = async (data: CreateState) => {
    const errorMessage = createValidation({ inputData: data, options });

    if (typeof errorMessage === "string") {
      setToast(errorMessage, true);
      return;
    }

    submit({ data, options });
  };

  const inValid = (error: FieldErrors) => {
    const message = error.desc?.message || error.title?.message || error.price?.message || error.image?.message;
    setToast(message as string, true);
  };

  return (
    <>
      <Header goBack />
      <ToastUI />
      {isTabOpen && <Overlay />}
      <div className=" px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <UploadImages
            register={register}
            deleteImage={handleImage.deleteImage}
            encodeFile={handleImage.encodeFile}
            imgsrc={handleImage.imgsrc}
          />
          <div className="border-b border-t border-borderColor-gray pb-2 [&>input]:h-[52px] [&>input]:border-b [&>input]:px-4">
            <input
              {...register("title", { required: "제목을 입력해주세요." })}
              type="text"
              name="title"
              placeholder="제목"
            />
            <input
              {...register("price", {
                required: "상품의 가격을 입력해주세요.",
              })}
              type="text"
              name="price"
              placeholder="가격"
              autoComplete="off"
            />
            <div className="relative h-auto w-full p-5">
              <textarea
                {...register("desc", {
                  required: "아이템에 대한 설명을 작성해주세요.",
                })}
                name="desc"
                rows={10}
                className={cls("peer w-full resize-none", isFocus ? "is-focus" : "")}
                onChange={handleTextArea}
              />
              <div
                className="pointer-events-none absolute left-5 top-5 bg-transparent text-common-gray 
              peer-focus:hidden peer-[.is-focus]:hidden"
              >
                <p>아이템에 대한 설명을 작성해주세요.</p>
                <p className="mt-3">작성예시. 제품상태, 사이즈, 소재 등 자세히</p>
              </div>
            </div>
            <input
              {...register("tag")}
              type="text"
              name="tag"
              placeholder="검색에 사용될 태그를 작성해주세요. Ex. #빈티지"
              autoComplete="off"
              className="border"
            />
          </div>
          <div className="[&>*]:flex [&>*]:h-[52px] [&>*]:items-center [&>*]:justify-between [&>*]:border-b [&>*]:px-4">
            {Object.values(options).map((value, i) => (
              <div key={`tab${i}`} onClick={() => handleOption.openOptionItem(value.name)}>
                <span>{value.name}</span>
                <Icon icon="material-symbols:arrow-outward" />
              </div>
            ))}
          </div>
          {isTabOpen && (
            <OptionTab
              isTabOpen={isTabOpen}
              options={options}
              selectOptionItem={handleOption.selectOptionItem}
              submitBrand={handleOption.submitBrand}
              closeTab={handleOption.closeTab}
            />
          )}
          <div className="mt-40">
            <Button type="submit" text="완료" classes="bg-black" fontColor="text-white" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </>
  );
};

export default noExistUser(Create);
