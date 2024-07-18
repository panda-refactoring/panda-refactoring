import { NextPage } from "next";
import { Icon } from "@iconify/react";

import { firstToUppercase } from "src/common/util/markets";
import { TitleBoxProps } from "./types";

const TitleBox: NextPage<TitleBoxProps> = ({
  product,
  isFavActive,
  toggleFav,
}) => {
  return (
    <div className="flex justify-between">
      <div>
        <p className="text-base">{firstToUppercase(product?.brand)}</p>
        <h1 className="text-xl font-bold">{product?.title}</h1>
      </div>
      {!isFavActive ? (
        <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-common-black transition hover:scale-105">
          <Icon
            icon="icon-park-outline:like"
            className="text-lg"
            onClick={toggleFav}
          />
        </div>
      ) : (
        <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-common-black bg-common-black transition hover:scale-105 ">
          <Icon
            icon="icon-park-solid:like"
            color="#ff5252"
            className=" border border-common-black text-lg"
            onClick={toggleFav}
          />
        </div>
      )}
    </div>
  );
};

export default TitleBox;
