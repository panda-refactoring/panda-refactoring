import { CreateState, Options } from "../types/create.types";

export const createValidation = ({ inputData, options }: { inputData: CreateState; options: Options }) => {
  const { tag, price } = inputData;
  const numberCheck = /[0-9]/g;
  let errorMessage;
  let isNotTag;

  if (typeof tag === "string" && tag.length > 0) {
    const tags = tag?.trim().split("#");
    if (tags.length === 0) {
      isNotTag = true;
    }
  }

  if (!numberCheck.test(price as string)) {
    errorMessage = "상품가격을 숫자로 기입해주세요.";
  } else if (options.category.name === "카테고리") {
    errorMessage = "카테고리를 선택해 주세요.";
  } else if (isNotTag) {
    errorMessage = "형식에 맞게 태그를 입력해주세요. (예시: '#빈티지')";
  }

  return errorMessage;
};
