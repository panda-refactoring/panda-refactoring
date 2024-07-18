import { NextPage } from "next";

import { categoryToEng, firstToUppercase } from "src/common/util/markets";
import { CategoryBoxProps } from "./types";

const CategoryBox: NextPage<CategoryBoxProps> = ({ product, favCount }) => {
  return (
    <>
      <div className="mb-6 mt-4 flex gap-2">
        {product.category !== "" && (
          <div className="rounded-full border border-common-black px-2 py-0.5">
            {categoryToEng(product.category)}
          </div>
        )}
        <div className="rounded-full border border-common-black px-2 py-0.5">
          {firstToUppercase(product.brand)}
        </div>
      </div>
      <div className="mb-4 flex text-xs text-common-gray">
        <span className="mr-2">조회 {product.view}</span>
        <span>찜 {favCount}</span>
      </div>
    </>
  );
};

export default CategoryBox;
