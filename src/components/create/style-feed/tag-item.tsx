import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { TagItemProps } from "../types";

const TagItem: NextPage<TagItemProps> = ({ tagItem, removeItem }) => {
  const { id, imgurl, title, brand, price } = tagItem;

  return (
    <li key={id} className="flex items-center justify-between">
      <div className="flex">
        <img
          src={imgurl[0].img}
          alt={title}
          className="mr-3 h-[62px] w-[62px] border border-common-black object-cover"
        />
        <div className="text-common-black">
          <p>{brand}</p>
          <p className="mb-2 text-xs text-textColor-gray-100">{title}</p>
          <p className="font-bold">{price}</p>
        </div>
      </div>
      <Icon
        icon="ri:close-circle-fill"
        className="rounded-full bg-white text-xl"
        onClick={() => removeItem(Number(id))}
      />
    </li>
  );
};

export default TagItem;
